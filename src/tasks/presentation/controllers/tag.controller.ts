import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Tag } from "src/tasks/domain/tag.domain";
import { CreateTagDto } from "../dto/create-tag.dto";
import { CreateTagCommand } from "src/tasks/application/commands/create-tag.command";
import { GetAllTagsQuery } from "src/tasks/application/queries/get-all-tags.query";

@ApiTags("Tags")
@Controller("tags")
export class TagController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    @Post()
    @ApiOperation({ summary: "Create a new tag" })
    @ApiResponse({ status: 201, description: "The created tag", type: Tag })
    async createTag(@Body() createTagDto: CreateTagDto) {
        return this.commandBus.execute(new CreateTagCommand(createTagDto.title, createTagDto.color, createTagDto.textColor, createTagDto.icon));
    }

    @Get()
    @ApiOperation({ summary: "Get all tags" })
    @ApiResponse({ status: 200, description: "List of all tags", type: [Tag] })
    async getAllTags() {
        return this.queryBus.execute(new GetAllTagsQuery());
    }
}
