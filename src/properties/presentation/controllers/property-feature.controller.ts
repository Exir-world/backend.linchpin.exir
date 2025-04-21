import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreatePropertyFeatureDto } from '../dto/create-property-feature.dto';
import { CreatePropertyFeatureCommand } from 'src/properties/application/commands/create-property-feature.command';
import { DeletePropertyFeatureCommand } from 'src/properties/application/commands/delete-property-feature.command';

@ApiBearerAuth()
@ApiTags('Property Features')
@Controller('property-features')
export class PropertyFeatureController {
    constructor(private commandBus: CommandBus) { }

    @Post()
    @ApiOperation({ summary: 'Add a feature to a property' })
    @ApiResponse({ status: 201, description: 'Feature added to property successfully.' })
    async create(@Body() dto: CreatePropertyFeatureDto) {
        return this.commandBus.execute(
            new CreatePropertyFeatureCommand(dto.propertyId, dto.featureId, dto.value)
        );
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove a feature from a property' })
    @ApiResponse({ status: 200, description: 'Feature removed from property successfully.' })
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.commandBus.execute(new DeletePropertyFeatureCommand(id));
    }
}
