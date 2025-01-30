import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserAuthGuard } from 'src/auth/application/guards/user-auth.guard';
import { CreateUserCriteriaDto } from '../dto/create-user-criteria.dto';
import { CreateUserCriteriaCommand } from 'src/user-criterion/application/commands/create-user-criterion.command';

@ApiTags('User Criterion')
@ApiBearerAuth() // Adds the JWT Authorization header to Swagger UI
@Controller('user-criterion')
export class UserCriterionController {
    constructor(private readonly commandBus: CommandBus) { }

    @UseGuards(UserAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Create multiple user criterion evaluations' })
    @ApiResponse({ status: 201, description: 'User criterion evaluations created successfully' })
    @ApiResponse({ status: 400, description: 'Validation failed' })
    async create(@Body() body: CreateUserCriteriaDto, @Request() req) {
        const userId = req.user.id; // Extract user ID from JWT
        return this.commandBus.execute(new CreateUserCriteriaCommand(userId, body.criteria));
    }
}
