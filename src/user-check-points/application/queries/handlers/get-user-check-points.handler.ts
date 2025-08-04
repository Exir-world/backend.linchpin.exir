import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { GetUserCheckPointsQuery } from '../get-user-check-points.query';
import { UserCheckPointEntity } from 'src/user-check-points/infrastructure/entities/user-check-point.entity';
import { UserCheckpointAssignEntity } from 'src/user-check-points/infrastructure/entities/user-check-point-assign.entity';
import { NotFoundException } from '@nestjs/common';
import { CheckPointEntity } from 'src/check-points/infrastructure/entities/check-point.entity';

@QueryHandler(GetUserCheckPointsQuery)
export class GetUserCheckPointsHandler implements IQueryHandler<GetUserCheckPointsQuery> {
    constructor(
        @InjectRepository(CheckPointEntity)
        private readonly checkRepo: Repository<CheckPointEntity>,
        @InjectRepository(UserCheckPointEntity)
        private readonly repo: Repository<UserCheckPointEntity>,
        @InjectRepository(UserCheckpointAssignEntity)
        private readonly userAssignRepo: Repository<UserCheckpointAssignEntity>,
    ) { }

    async execute(query: GetUserCheckPointsQuery) {
        const now = new Date();
        const assigned = await this.userAssignRepo.findOne({
            where: {
                userId: query.userId,
                startDate: LessThanOrEqual(now),
                endDate: MoreThanOrEqual(now) || IsNull(),
            },
        });

        if (!assigned)
            throw new NotFoundException('User has no active checkpoint assignments');

        const checkPoint = await this.checkRepo.findOne({
            where: { id: assigned.checkpointId },
            relations: ['items'],
        });

        if (!checkPoint)
            throw new NotFoundException('Checkpoint not found');

        const userCheckpoints = await this.repo.find({
            where: { userId: query.userId },
            relations: ['attachments'],
            order: { createdAt: 'DESC' },
        });

        return {
            items: checkPoint.items.map(item => ({
                ...item,
                userCheckPoints: userCheckpoints.find(cp => cp.checkPointItemId === item.id),
            })),
        }
    }
}