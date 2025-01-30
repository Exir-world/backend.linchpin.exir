import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetAllPrioritiesQuery } from "../get-all-priorities.query";
import { PriorityEntity } from "src/tasks/infrastructure/entities/priority.entity";

@QueryHandler(GetAllPrioritiesQuery)
export class GetAllPrioritiesHandler implements IQueryHandler<GetAllPrioritiesQuery> {
    constructor(
        @InjectRepository(PriorityEntity)
        private readonly priorityRepository: Repository<PriorityEntity>
    ) { }

    async execute(_: GetAllPrioritiesQuery): Promise<PriorityEntity[]> {
        return await this.priorityRepository.find();
    }
}
