import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Task } from "src/tasks/domain/task.domain";
import { CreateTaskDto } from "../dto/create-task.dto";
import { CreateTaskCommand } from "src/tasks/application/commands/create-task.command";
import { GetTasksByUserQuery } from "src/tasks/application/queries/get-tasks-by-user.query";
import { GetTasksByCreatorQuery } from "src/tasks/application/queries/get-tasks-by-creator.query";
import { GetTaskByIdQuery } from "src/tasks/application/queries/get-task-by-id.query";

@ApiTags("Tasks")
@Controller("tasks")
export class TaskController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post()
    @ApiOperation({ summary: "Create a new task" })
    @ApiResponse({ status: 201, description: "The created task", type: Task })
    async createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.commandBus.execute(new CreateTaskCommand(
            createTaskDto.title,
            createTaskDto.description,
            createTaskDto.priorityId,
            createTaskDto.date,
            createTaskDto.userId,
            createTaskDto.tagIds,
            createTaskDto.subtasks,
            createTaskDto.attachments
        ));
    }

    @Get("user/:userId")
    @ApiOperation({ summary: "Get tasks assigned to a user" })
    @ApiResponse({ status: 200, description: "List of tasks assigned to user", type: [Task] })
    async getTasksByUser(@Param("userId") userId: number) {
        return this.queryBus.execute(new GetTasksByUserQuery(userId));
    }

    @Get("creator/:createdBy")
    @ApiOperation({ summary: "Get tasks created by a user" })
    @ApiResponse({ status: 200, description: "List of tasks created by the user", type: [Task] })
    async getTasksByCreator(@Param("createdBy") createdBy: number) {
        return this.queryBus.execute(new GetTasksByCreatorQuery(createdBy));
    }

    @Get(":taskId")
    @ApiOperation({ summary: "Get task details by ID" })
    @ApiResponse({ status: 200, description: "Task details with priority, tags, subtasks, and attachments", type: Task })
    async getTaskById(@Param("taskId") taskId: number) {
        return this.queryBus.execute(new GetTaskByIdQuery(taskId));
    }
}
