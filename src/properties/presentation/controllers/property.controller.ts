import { Controller, Post, Get, Body, Param, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { AdminAuthGuard } from 'src/auth/application/guards/admin-auth.guard';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePropertyCommand } from 'src/properties/application/commands/create-property.command';
import { GetAllPropertiesQuery } from 'src/properties/application/queries/get-all-properties.query';
import { GetPropertyByIdQuery } from 'src/properties/application/queries/get-property-by-id.query';
import { UpdatePropertyCommand } from 'src/properties/application/commands/update-property.command';
import { DeletePropertyCommand } from 'src/properties/application/commands/delete-property.command';

@UseGuards(AdminAuthGuard)
@ApiBearerAuth()
@ApiTags('Property')
@Controller('properties')
export class PropertyController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post()
    @ApiOperation({ summary: 'ایجاد اموال جدید' })
    @ApiResponse({ status: 201, description: 'ملک با موفقیت ایجاد شد.' })
    create(@Body() dto: CreatePropertyDto) {
        const command = new CreatePropertyCommand(
            dto.title, dto.code, dto.status, dto.organizationId, dto.departmentId
        );
        return this.commandBus.execute(command);
    }

    @Get()
    @ApiOperation({ summary: 'دریافت لیست اموال' })
    @ApiQuery({ name: 'organizationId', required: false, type: Number })
    @ApiQuery({ name: 'departmentId', required: false, type: Number })
    findAll(@Query('organizationId') organizationId?: number, @Query('departmentId') departmentId?: number) {
        return this.queryBus.execute(new GetAllPropertiesQuery(organizationId, departmentId));
    }

    @Get(':id')
    @ApiOperation({ summary: 'دریافت جزئیات اموال' })
    findOne(@Param('id') id: number) {
        return this.queryBus.execute(new GetPropertyByIdQuery(id));
    }

    @Put(':id')
    @ApiOperation({ summary: 'ویرایش اطلاعات اموال' })
    update(@Param('id') id: number, @Body() dto: UpdatePropertyDto) {
        const command = new UpdatePropertyCommand(
            id, dto.title, dto.code, dto.status, dto.organizationId, dto.departmentId
        );
        return this.commandBus.execute(command);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف اموال' })
    remove(@Param('id') id: number) {
        return this.commandBus.execute(new DeletePropertyCommand(id));
    }
}
