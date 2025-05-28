import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetImprovementParameterSubQuery } from "../get-improvement-parameter-sub.query";
import { InjectRepository } from "@nestjs/typeorm";
import { ImprovementParameterEntity } from "src/improvement-parameters/infrastructure/entities/improvement-parameter.entitiy";
import { Repository } from "typeorm";

@QueryHandler(GetImprovementParameterSubQuery)
export class GetImprovementParameterSubQueryHandler implements IQueryHandler<GetImprovementParameterSubQuery> {
    constructor(
        @InjectRepository(ImprovementParameterEntity)
        private readonly repo: Repository<ImprovementParameterEntity>,
    ) { }

    async execute(query: GetImprovementParameterSubQuery): Promise<ImprovementParameterEntity[]> {
        return this.repo.find({ where: { parent: { id: query.parentId } } });
    }
}