import { Controller, Get, Body, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserImprovementParameterDto } from '../dto/create-user-improvement-parameter.dto';
import { CreateUserImprovementParameterCommand } from 'src/improvement-parameters/application/commands/create-user-improvement-parameter.command';
import { GetUserImprovementParametersQuery } from 'src/improvement-parameters/application/queries/get-user-improvement-parameters.query';
import { UserAuthGuard } from 'src/auth/application/guards/user-auth.guard';

@ApiBearerAuth()
@ApiTags('User Improvement Parameters')
@Controller('user-improvement-parameters')
export class UserImprovementParameterController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    @UseGuards(UserAuthGuard) // Assuming you have a JWT Auth Guard
    @Post()
    @ApiOperation({ summary: 'ایجاد پارامترهای بهبود برای کاربر' })
    @ApiResponse({ status: 201, description: 'ایجاد موفق پارامترهای کاربر' })
    @ApiResponse({ status: 400, description: 'Validation failed' })
    async createUserImprovementParams(@Req() req, @Body() body: CreateUserImprovementParameterDto) {
        const userId = req.user.id;
        const parentId = await this.commandBus.execute(
            new CreateUserImprovementParameterCommand(
                userId,
                body.improvementId,
                body.userScore,
                body.description
            )
        );

        return this.queryBus.execute(new GetUserImprovementParametersQuery(userId, parentId));
    }

    @UseGuards(UserAuthGuard) // Assuming you have a JWT Auth Guard
    @Get()
    @ApiOperation({ summary: '' })
    @ApiResponse({ status: 200 })
    @ApiQuery({ name: 'parentId', required: false, type: Number })
    async getUserImprovementParams(@Req() req, @Query('parentId') parentId?: number) {
        const userId = req.user.id;
        return this.queryBus.execute(new GetUserImprovementParametersQuery(userId, parentId));
    }
}