import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllCheckPointsForAdminQuery } from "../get-all-check-points-for-admin.query";
import { InjectRepository } from "@nestjs/typeorm";
import { UserCheckPointEntity } from "src/user-check-points/infrastructure/entities/user-check-point.entity";
import { Repository } from "typeorm";

@QueryHandler(GetAllCheckPointsForAdminQuery)
export class GetAllCheckPointsForAdminHandler implements IQueryHandler<GetAllCheckPointsForAdminQuery> {
    constructor(
        @InjectRepository(UserCheckPointEntity)
        private readonly repo: Repository<UserCheckPointEntity>,
    ) { }

    async execute() {
        return this.repo.find({
            relations: ['attachments'],
            order: { createdAt: 'DESC' },
        });
    }
}