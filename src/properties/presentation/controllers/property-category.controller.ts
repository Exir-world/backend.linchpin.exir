import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreatePropertyCategoryDto } from '../dto/create-property-category.dto';
import { CreatePropertyCategoryCommand } from 'src/properties/application/commands/create-property-category.command';
import { GetPropertyCategoriesQuery } from 'src/properties/application/queries/get-property-categories.query';
import { UpdatePropertyCategoryDto } from '../dto/update-property-category.dto';
import { UpdatePropertyCategoryCommand } from 'src/properties/application/commands/update-property-category.command';
import { DeletePropertyCategoryCommand } from 'src/properties/application/commands/delete-property-category.command';

@ApiBearerAuth()
@ApiTags('Property Categories')
@Controller('property-categories')
export class PropertyCategoryController {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) { }

    @Post()
    @ApiOperation({ summary: 'Create a new property category with optional features' })
    @ApiResponse({ status: 201, description: 'The category has been successfully created.' })
    async create(@Body() dto: CreatePropertyCategoryDto) {
        return this.commandBus.execute(
            new CreatePropertyCategoryCommand(dto.title, dto.features)
        );
    }

    @Get()
    @ApiOperation({ summary: 'Get all property categories' })
    @ApiResponse({ status: 200, description: 'List of all property categories' })
    async findAll() {
        return this.queryBus.execute(new GetPropertyCategoriesQuery());
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update the title of a property category' })
    @ApiResponse({ status: 200, description: 'The category has been successfully updated.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdatePropertyCategoryDto,
    ) {
        return this.commandBus.execute(
            new UpdatePropertyCategoryCommand(id, dto.title, (dto.features as any[]))
        );
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a property category by ID' })
    @ApiResponse({ status: 200, description: 'The category has been successfully deleted.' })
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.commandBus.execute(new DeletePropertyCategoryCommand(id));
    }
}