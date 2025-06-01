import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCheckPointDto } from '../dto/create-user-check-point.dto';
import { CreateUserCheckPointCommand } from 'src/user-check-points/application/commands/create-user-check-point.command';
import { GetUserCheckPointsQuery } from 'src/user-check-points/application/queries/get-user-check-points.query';
import { GetAllCheckPointsForAdminQuery } from 'src/user-check-points/application/queries/get-all-check-points-for-admin.query';

@ApiTags('UserCheckPoints')
@Controller('user-check-points')
export class UserCheckPointController {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) { }

    @Post()
    @ApiOperation({ summary: 'Submit a check point by user' })
    async create(@Body() dto: CreateUserCheckPointDto) {
        return await this.commandBus.execute(new CreateUserCheckPointCommand(dto));
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Get check points submitted by a specific user' })
    async getByUser(@Param('userId') userId: number) {
        return await this.queryBus.execute(new GetUserCheckPointsQuery(+userId));
    }

    @Get('admin/all')
    @ApiOperation({ summary: 'Get all check points (admin view)' })
    async getAllForAdmin() {
        return await this.queryBus.execute(new GetAllCheckPointsForAdminQuery());
    }
}
