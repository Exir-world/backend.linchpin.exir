import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserTimesDto } from '../dto/create-user-times.dto';
import { CreateUserTimesCommand } from 'src/user-times/application/commands/create-user-times.command';
import { GetLatestUserTimesQuery } from 'src/user-times/application/queries/get-latest-user-times.query';

@ApiTags('UserTimes')
@Controller('user-times')
export class UserTimesController {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) { }

    @Post()
    @ApiOperation({ summary: 'Create new UserTimes record with weekly schedule' })
    async create(@Body() dto: CreateUserTimesDto) {
        return await this.commandBus.execute(new CreateUserTimesCommand(dto));
    }

    @Get('latest/:userId')
    @ApiOperation({ summary: 'Get latest UserTimes for user' })
    async getLatest(@Param('userId') userId: number) {
        return await this.queryBus.execute(new GetLatestUserTimesQuery(+userId));
    }
}