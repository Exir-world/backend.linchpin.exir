import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCheckPointDto } from '../dto/create-user-check-point.dto';
import { CreateUserCheckPointCommand } from 'src/user-check-points/application/commands/create-user-check-point.command';
import { GetUserCheckPointsQuery } from 'src/user-check-points/application/queries/get-user-check-points.query';
import { GetAllCheckPointsForAdminQuery } from 'src/user-check-points/application/queries/get-all-check-points-for-admin.query';
import { UserAuthGuard } from 'src/auth/application/guards/user-auth.guard';

@ApiBearerAuth()
@ApiTags('UserCheckPoints')
@Controller('user-check-points')
export class UserCheckPointController {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) { }

    @UseGuards(UserAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Submit a check point by user' })
    async create(@Req() req: any, @Body() dto: CreateUserCheckPointDto) {
        return await this.commandBus.execute(new CreateUserCheckPointCommand(req.user.id, dto));
    }

    @UseGuards(UserAuthGuard)
    @Get('user')
    @ApiOperation({ summary: 'Get check points submitted by a specific user' })
    async getByUser(@Req() req: any) {
        return await this.queryBus.execute(new GetUserCheckPointsQuery(+req.user.id));
    }

    @Get('admin/all')
    @ApiOperation({ summary: 'Get all check points (admin view)' })
    async getAllForAdmin() {
        return await this.queryBus.execute(new GetAllCheckPointsForAdminQuery());
    }
}
