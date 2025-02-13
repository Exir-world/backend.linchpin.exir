import { Controller, Post, Body, Request, UseGuards, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/auth/application/guards/user-auth.guard';
import { CreateUserSelfImprovementCommand } from 'src/user-self-improvement/application/commands/create-user-self-improvement.command';
import { CreateUserSelfImprovementDto } from '../dto/create-user-self-improvement.dto';
import { GetUserSelfImprovementByOrgIdHandler } from 'src/user-self-improvement/application/queries/handlers/get-user-self-improvements-by-org-id.handler';
import { GetUserSelfImprovementsByOrgIdQuery } from 'src/user-self-improvement/application/queries/get-user-self-improvements-by-org-id.query';

@ApiTags('User Self Improvement')
@ApiBearerAuth() // Adds the JWT Authorization header to Swagger UI
@Controller('user-self-improvement')
export class UserSelfImprovementController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    @UseGuards(UserAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Create multiple user self-improvement evaluations' })
    @ApiResponse({ status: 201, description: 'User self-improvement evaluations created successfully' })
    @ApiResponse({ status: 400, description: 'Validation failed' })
    async create(@Body() body: CreateUserSelfImprovementDto, @Request() req) {
        const userId = req.user.id; // Extract user ID from JWT
        return this.commandBus.execute(new CreateUserSelfImprovementCommand(userId, body.items));
    }

    @UseGuards(UserAuthGuard)
    @Get()
    @ApiOperation({ summary: 'Get multiple user self-improvement evaluations' })
    async get(@Request() req) {
        const userId = req.user.id; // Extract user ID from JWT
        return this.queryBus.execute(new GetUserSelfImprovementsByOrgIdQuery(userId));
    }
}
