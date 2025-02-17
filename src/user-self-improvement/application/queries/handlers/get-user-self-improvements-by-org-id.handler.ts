import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationSharedPort } from 'src/organization/application/ports/organization-shared.port';
import { Inject } from '@nestjs/common';
import { GetUserSelfImprovementsByOrgIdQuery } from '../get-user-self-improvements-by-org-id.query';
import { UserSelfImprovementEntity } from 'src/user-self-improvement/infrastructure/entities/user-self-improvement.entity';

@QueryHandler(GetUserSelfImprovementsByOrgIdQuery)
export class GetUserSelfImprovementByOrgIdHandler implements IQueryHandler<GetUserSelfImprovementsByOrgIdQuery> {
    constructor(
        @Inject('OrganizationSharedPort')
        private readonly organizationService: OrganizationSharedPort,
        @InjectRepository(UserSelfImprovementEntity)
        private readonly repository: Repository<UserSelfImprovementEntity>) { }

    async execute(query: GetUserSelfImprovementsByOrgIdQuery): Promise<any> {
        const userId = query.userId;

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const imps = await this.organizationService.getSelfImprovementsByOrgId(1);

        const userImps = await this.repository.find({
            where: {
                userId,
                date: Between(startOfDay, endOfDay),
            },
        });

        const userItems = imps[0].items.map(item => ({
            id: item.id,
            title: item.title,
            image: item.image,
            color: item.color,
            date: userImps.find(userImp => userImp.improvementId === item.id)?.date,
            done: (userImps.find(userImp => userImp.improvementId === item.id)?.userScore || 0) == 13,
        }))

        return {
            score: 1300,
            scoreIcon: 'https://token.ex.pro/cdn/self-improvement/si_gem.svg',
            userItems,
        }
    }
}