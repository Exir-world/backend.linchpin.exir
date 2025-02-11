import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from "@nestjs/swagger";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Task } from "src/tasks/domain/task.domain";
import { CreateTaskDto } from "../dto/create-task.dto";
import { CreateTaskCommand } from "src/tasks/application/commands/create-task.command";
import { GetTasksByUserQuery } from "src/tasks/application/queries/get-tasks-by-user.query";
import { GetTasksByCreatorQuery } from "src/tasks/application/queries/get-tasks-by-creator.query";
import { GetTaskByIdQuery } from "src/tasks/application/queries/get-task-by-id.query";
import { UserAuthGuard } from "src/auth/application/guards/user-auth.guard";
import { GetTasksQuery } from "src/tasks/application/queries/get-tasks.query";
import { ApproveTaskByCreatorDto } from "../dto/approve-task-by-creator.dto";
import { ApproveTaskByCreatorCommand } from "src/tasks/application/commands/approve-task-by-creator.command";
import { DoneSubtaskDto } from "../dto/done-sub-task.dto";
import { DoneSubTaskCommand } from "src/tasks/application/commands/done-sub-task.command";

@ApiBearerAuth()
@ApiTags("Tasks")
@Controller("tasks")
export class TaskController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @UseGuards(UserAuthGuard)
    @Post()
    @ApiOperation({ summary: "Create a new task" })
    @ApiResponse({ status: 201, description: "The created task", type: Task })
    async createTask(@Request() req, @Body() createTaskDto: CreateTaskDto) {
        return this.commandBus.execute(new CreateTaskCommand(
            createTaskDto.title,
            createTaskDto.description,
            createTaskDto.priorityId,
            createTaskDto.date,
            req.user.id, // createdBy
            createTaskDto.userId,
            createTaskDto.tagIds,
            createTaskDto.subtasks,
            createTaskDto.attachments
        ));
    }

    @UseGuards(UserAuthGuard)
    @Post('approve')
    @ApiOperation({ summary: "Approve a task by creator" })
    async approveTask(@Request() req, @Body() dto: ApproveTaskByCreatorDto) {
        return this.commandBus.execute(new ApproveTaskByCreatorCommand(
            req.user.id, // createdBy
            dto.taskId,
            dto.comment,
        ));
    }

    @UseGuards(UserAuthGuard)
    @Post('subtask/done')
    @ApiOperation({ summary: "Approve a task by creator" })
    async doneSubtask(@Request() req, @Body() dto: DoneSubtaskDto) {
        return this.commandBus.execute(new DoneSubTaskCommand(
            req.user.id, // createdBy
            dto.subtaskId,
            dto.done,
        ));
    }

    @UseGuards(UserAuthGuard)
    @Get()
    @ApiOperation({ summary: "Get tasks" })
    @ApiResponse({ status: 200, description: "List of tasks created by the user", type: [Task] })
    @ApiQuery({ name: "startDate", required: false, description: "Filter tasks from this date (format: YYYY-MM-DD)" })
    @ApiQuery({ name: "endDate", required: false, description: "Filter tasks until this date (format: YYYY-MM-DD)" })
    @ApiQuery({ name: "priorityId", required: false, description: "Filter tasks by priority ID" })
    @ApiQuery({ name: "userId", required: false, description: "Filter tasks by user ID" })
    async getTasks(
        @Request() req,
        @Query("startDate") startDate?: string,
        @Query("endDate") endDate?: string,
        @Query("priorityId") priorityId?: number,
        @Query("userId") userId?: number,
    ) {
        return this.queryBus.execute(new GetTasksQuery(req.user.id, startDate, endDate, priorityId, userId));
    }

    @UseGuards(UserAuthGuard)
    @Get("user")
    @ApiOperation({ summary: "Get tasks assigned to a user" })
    @ApiResponse({ status: 200, description: "List of tasks assigned to user", type: [Task] })
    @ApiQuery({ name: "startDate", required: false, description: "Filter tasks from this date (format: YYYY-MM-DD)" })
    @ApiQuery({ name: "endDate", required: false, description: "Filter tasks until this date (format: YYYY-MM-DD)" })
    @ApiQuery({ name: "priorityId", required: false, description: "Filter tasks by priority ID" })
    async getTasksByUser(
        @Request() req,
        @Query("startDate") startDate?: string,
        @Query("endDate") endDate?: string,
        @Query("priorityId") priorityId?: number
    ) {
        return this.queryBus.execute(new GetTasksByUserQuery(req.user.id, startDate, endDate, priorityId));
    }


    @UseGuards(UserAuthGuard)
    @Get("creator")
    @ApiOperation({ summary: "Get tasks created by a user" })
    @ApiResponse({ status: 200, description: "List of tasks created by the user", type: [Task] })
    @ApiQuery({ name: "startDate", required: false, description: "Filter tasks from this date (format: YYYY-MM-DD)" })
    @ApiQuery({ name: "endDate", required: false, description: "Filter tasks until this date (format: YYYY-MM-DD)" })
    @ApiQuery({ name: "priorityId", required: false, description: "Filter tasks by priority ID" })
    @ApiQuery({ name: "userId", required: false, description: "Filter tasks by user ID" })
    async getTasksByCreator(
        @Request() req,
        @Query("startDate") startDate?: string,
        @Query("endDate") endDate?: string,
        @Query("priorityId") priorityId?: number,
        @Query("userId") userId?: number,
    ) {
        return this.queryBus.execute(new GetTasksByCreatorQuery(req.user.id, startDate, endDate, priorityId, userId));
    }

    @UseGuards(UserAuthGuard)
    @Get(":taskId")
    @ApiOperation({ summary: "Get task details by ID" })
    @ApiResponse({ status: 200, description: "Task details with priority, tags, subtasks, and attachments", type: Task })
    async getTaskById(@Request() req, @Param("taskId") taskId: number) {
        return this.queryBus.execute(new GetTaskByIdQuery(taskId, req.user.id));
    }
}
