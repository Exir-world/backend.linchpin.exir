import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
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
    @ApiQuery({ name: "startDate", required: false, description: "Filter tasks from this date (format: YYYY-MM-DD)" })
    @ApiQuery({ name: "endDate", required: false, description: "Filter tasks until this date (format: YYYY-MM-DD)" })
    @ApiQuery({ name: "priorityId", required: false, description: "Filter tasks by priority ID" })
    async getTasksByUser(
        @Param("userId") userId: number,
        @Query("startDate") startDate?: string,
        @Query("endDate") endDate?: string,
        @Query("priorityId") priorityId?: number
    ) {
        return this.queryBus.execute(new GetTasksByUserQuery(userId, startDate, endDate, priorityId));
    }


    @Get("creator/:createdBy")
    @ApiOperation({ summary: "Get tasks created by a user" })
    @ApiResponse({ status: 200, description: "List of tasks created by the user", type: [Task] })
    @ApiQuery({ name: "startDate", required: false, description: "Filter tasks from this date (format: YYYY-MM-DD)" })
    @ApiQuery({ name: "endDate", required: false, description: "Filter tasks until this date (format: YYYY-MM-DD)" })
    @ApiQuery({ name: "priorityId", required: false, description: "Filter tasks by priority ID" })
    @ApiQuery({ name: "userId", required: false, description: "Filter tasks by user ID" })
    async getTasksByCreator(
        @Param("createdBy") createdBy: number,
        @Query("startDate") startDate?: string,
        @Query("endDate") endDate?: string,
        @Query("priorityId") priorityId?: number,
        @Query("userId") userId?: number,
    ) {
        return this.queryBus.execute(new GetTasksByCreatorQuery(createdBy, startDate, endDate, priorityId, userId));
    }

    @Get(":taskId")
    @ApiOperation({ summary: "Get task details by ID" })
    @ApiResponse({ status: 200, description: "Task details with priority, tags, subtasks, and attachments", type: Task })
    async getTaskById(@Param("taskId") taskId: number) {
        return this.queryBus.execute(new GetTaskByIdQuery(taskId));
    }
}
