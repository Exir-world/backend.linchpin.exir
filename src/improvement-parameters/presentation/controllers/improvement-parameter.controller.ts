import { Controller, Get, Body, Post, Query, Req } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateImprovementParametersDto } from '../dto/create-improvement-parameters.dto';
import { CreateImprovementParametersCommand } from 'src/improvement-parameters/application/commands/create-improvement-parameters.command';
import { GetImprovementParametersQuery } from 'src/improvement-parameters/application/queries/get-improvement-parameter.query';
import { GetImprovementParameterSubQuery } from 'src/improvement-parameters/application/queries/get-improvement-parameter-sub.query';

@ApiTags('Improvement Parameters')
@Controller('improvement-parameters')
export class ImprovementParameterController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    @Post()
    @ApiOperation({ summary: 'ایجاد آیتم و زیرآیتم‌ها به‌صورت چندتایی' })
    @ApiResponse({ status: 201, description: 'ایجاد موفق آیتم‌ها' })
    async create(@Body() body: CreateImprovementParametersDto) {
        return this.commandBus.execute(new CreateImprovementParametersCommand(body.items));
    }

    @Get('root')
    @ApiOperation({ summary: 'دریافت آیتم‌های اصلی بدون پدر' })
    @ApiResponse({ status: 200 })
    async getRoot() {
        return this.queryBus.execute(new GetImprovementParametersQuery());
    }

    @Get('sub')
    @ApiOperation({ summary: 'دریافت زیرآیتم‌ها با parentId' })
    @ApiResponse({ status: 200 })
    async getSub(@Query('parentId') parentId: number) {
        return this.queryBus.execute(new GetImprovementParameterSubQuery(parentId));
    }
}