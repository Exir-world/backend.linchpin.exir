import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Delete,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCheckPointDto } from '../dto/create-check-point.dto';
import { CreateCheckPointCommand } from 'src/check-points/application/commands/create-check-point.command';
import { GetCheckPointsQuery } from 'src/check-points/application/queries/get-check-points.query';
import { GetCheckPointByIdQuery } from 'src/check-points/application/queries/get-check-point-by-id.query';
import { UpdateCheckPointDto } from '../dto/update-check-point.dto';
import { UpdateCheckPointCommand } from 'src/check-points/application/commands/update-check-point.command';
import { UpdateCheckPointItemsDto } from '../dto/update-check-point-items.dto';
import { UpdateCheckPointItemsCommand } from 'src/check-points/application/commands/update-check-point-items.command';
import { DeleteCheckPointCommand } from 'src/check-points/application/commands/delete-check-point.command';

@ApiTags('CheckPoints')
@Controller('check-points')
export class CheckPointController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new CheckPoint with items' })
    @ApiResponse({ status: 201, description: 'CheckPoint created successfully.' })
    async create(@Body() dto: CreateCheckPointDto) {
        return await this.commandBus.execute(new CreateCheckPointCommand(dto));
    }

    @Get()
    @ApiOperation({ summary: 'Get all CheckPoints with their items' })
    async findAll() {
        return await this.queryBus.execute(new GetCheckPointsQuery(1));
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single CheckPoint by ID' })
    async findOne(@Param('id') id: number) {
        return await this.queryBus.execute(new GetCheckPointByIdQuery(+id));
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update CheckPoint (title, active, etc)' })
    async update(
        @Param('id') id: number,
        @Body() dto: UpdateCheckPointDto,
    ) {
        return await this.commandBus.execute(
            new UpdateCheckPointCommand(+id, dto),
        );
    }

    @Patch(':id/items')
    @ApiOperation({ summary: 'Update CheckPoint items (individually or add new)' })
    async updateItems(
        @Param('id') id: number,
        @Body() dto: UpdateCheckPointItemsDto,
    ) {
        return await this.commandBus.execute(
            new UpdateCheckPointItemsCommand(+id, dto),
        );
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a CheckPoint and its items' })
    async remove(@Param('id') id: number) {
        return await this.commandBus.execute(
            new DeleteCheckPointCommand(+id),
        );
    }
}
