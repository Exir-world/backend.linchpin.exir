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
import { UpdateTaskDto } from "../dto/update-task.dto";
import { UpdateTaskCommand } from "src/tasks/application/commands/update-task.command";
import { UpdateAttachmentsDto } from "../dto/update-attachments.dto";
import { UpdateAttachmentsCommand } from "src/tasks/application/commands/update-attachments.command";
import { UpdateSubtasksDto } from "../dto/update-subtasks.dto";
import { UpdateSubtasksCommand } from "src/tasks/application/commands/update-subtasks.command";

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
        const id = await this.commandBus.execute(new CreateTaskCommand(
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

        return this.queryBus.execute(new GetTaskByIdQuery(id, req.user.id));
    }

    @UseGuards(UserAuthGuard)
    @Post('approve')
    @ApiOperation({ summary: "Approve a task by creator" })
    async approveTask(@Request() req, @Body() dto: ApproveTaskByCreatorDto) {
        await this.commandBus.execute(new ApproveTaskByCreatorCommand(
            req.user.id, // createdBy
            dto.taskId,
            dto.comment,
        ));
        return this.queryBus.execute(new GetTaskByIdQuery(dto.taskId, req.user.id));
    }

    @UseGuards(UserAuthGuard)
    @Post('subtask/done')
    @ApiOperation({ summary: "Approve a task by creator" })
    async doneSubtask(@Request() req, @Body() dto: DoneSubtaskDto) {
        const res = await this.commandBus.execute(new DoneSubTaskCommand(
            req.user.id, // createdBy
            dto.subtaskId,
            dto.done,
        ));
        return this.queryBus.execute(new GetTaskByIdQuery(res.taskId, req.user.id));
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

    @UseGuards(UserAuthGuard)
    @Post('update-task')
    @ApiOperation({ summary: 'Update task details' })
    async updateTask(@Request() req, @Body() dto: UpdateTaskDto) {
        await this.commandBus.execute(new UpdateTaskCommand(dto.taskId, req.user.id, dto.title, dto.description, dto.priorityId, dto.date, dto.userId, dto.taskTags));
        return this.queryBus.execute(new GetTaskByIdQuery(dto.taskId, req.user.id));
    }

    @UseGuards(UserAuthGuard)
    @Post('update-attachments')
    @ApiOperation({ summary: 'Update task attachments' })
    async updateAttachments(@Request() req, @Body() dto: UpdateAttachmentsDto) {
        await this.commandBus.execute(new UpdateAttachmentsCommand(dto.taskId, req.user.id, dto.attachments));
        return this.queryBus.execute(new GetTaskByIdQuery(dto.taskId, req.user.id));
    }

    @UseGuards(UserAuthGuard)
    @Post('update-subtasks')
    @ApiOperation({ summary: 'Update task subtasks' })
    async updateSubtasks(@Request() req, @Body() dto: UpdateSubtasksDto) {
        await this.commandBus.execute(new UpdateSubtasksCommand(dto.taskId, req.user.id, dto.subtasks));
        return this.queryBus.execute(new GetTaskByIdQuery(dto.taskId, req.user.id));
    }
}
