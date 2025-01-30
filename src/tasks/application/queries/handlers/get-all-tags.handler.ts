import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GetAllTagsQuery } from "../get-all-tags.query";
import { TagEntity } from "src/tasks/infrastructure/entities/tag.entity";

@QueryHandler(GetAllTagsQuery)
export class GetAllTagsHandler implements IQueryHandler<GetAllTagsQuery> {
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>
    ) { }

    async execute(_: GetAllTagsQuery): Promise<TagEntity[]> {
        return await this.tagRepository.find();
    }
}
