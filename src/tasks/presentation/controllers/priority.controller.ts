import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Priority } from "src/tasks/domain/priority.domain";
import { CreatePriorityDto } from "../dto/create-priority.dto";
import { CreatePriorityCommand } from "src/tasks/application/commands/create-priority.command";
import { GetAllPrioritiesQuery } from "src/tasks/application/queries/get-all-priorities.query";

@ApiTags("Priorities")
@Controller("priorities")
export class PriorityController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    @Post()
    @ApiOperation({ summary: "Create a new priority" })
    @ApiResponse({ status: 201, description: "The created priority", type: Priority })
    async createPriority(@Body() createPriorityDto: CreatePriorityDto) {
        return this.commandBus.execute(
            new CreatePriorityCommand(createPriorityDto.title, createPriorityDto.priority, createPriorityDto.color)
        );
    }

    @Get()
    @ApiOperation({ summary: "Get all priorities" })
    @ApiResponse({ status: 200, description: "List of all priorities", type: [Priority] })
    async getAllPriorities() {
        return this.queryBus.execute(new GetAllPrioritiesQuery());
    }
}
