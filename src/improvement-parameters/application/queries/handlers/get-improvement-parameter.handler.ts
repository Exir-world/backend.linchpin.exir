import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetImprovementParametersQuery } from "../get-improvement-parameter.query";
import { InjectRepository } from "@nestjs/typeorm";
import { ImprovementParameterEntity } from "src/improvement-parameters/infrastructure/entities/improvement-parameter.entitiy";
import { IsNull, Repository } from "typeorm";

@QueryHandler(GetImprovementParametersQuery)
export class GetImprovementParametersQueryHandler implements IQueryHandler<GetImprovementParametersQuery> {
    constructor(
        @InjectRepository(ImprovementParameterEntity)
        private readonly repo: Repository<ImprovementParameterEntity>,
    ) { }

    async execute(): Promise<ImprovementParameterEntity[]> {
        return this.repo.find({ where: { parent: IsNull() } });
    }
}