import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTagCommand } from "../create-tag.command";
import { TagEntity } from "src/tasks/infrastructure/entities/tag.entity";

@CommandHandler(CreateTagCommand)
export class CreateTagHandler implements ICommandHandler<CreateTagCommand> {
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>
    ) { }

    async execute(command: CreateTagCommand): Promise<TagEntity> {
        const { title, color, textColor, icon } = command;
        const tag = new TagEntity();
        tag.title = title;
        tag.color = color;
        tag.textColor = textColor;
        tag.icon = icon;

        return await this.tagRepository.save(tag);
    }
}
