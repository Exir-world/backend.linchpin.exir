import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreatePropertyCategoryFeatureDto } from '../dto/create-property-category-feature.dto';
import { CreatePropertyCategoryFeatureCommand } from 'src/properties/application/commands/create-property-category-feature.command';
import { GetPropertyCategoryFeaturesQuery } from 'src/properties/application/queries/get-property-category-features.query';

@ApiBearerAuth()
@ApiTags('Property Category Features')
@Controller('property-category-features')
export class PropertyCategoryFeatureController {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) { }

    @Post()
    @ApiOperation({ summary: 'Create a new feature for a property category' })
    @ApiResponse({ status: 201, description: 'The feature has been successfully created.' })
    async create(@Body() dto: CreatePropertyCategoryFeatureDto) {
        return this.commandBus.execute(
            new CreatePropertyCategoryFeatureCommand(dto.title, dto.categoryId)
        );
    }

    @Get()
    @ApiOperation({ summary: 'Get all features for a given category' })
    @ApiResponse({ status: 200, description: 'List of features for the specified category' })
    async findAll(@Query('categoryId') categoryId: number) {
        return this.queryBus.execute(new GetPropertyCategoryFeaturesQuery(categoryId));
    }
}