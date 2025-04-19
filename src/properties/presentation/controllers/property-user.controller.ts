import { Controller, Post, Delete, Get, Body, UseGuards, Req, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AssignPropertyDto } from '../dto/assign-property.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AssignPropertyCommand } from 'src/properties/application/commands/assign-property.command';
import { UnassignPropertyCommand } from 'src/properties/application/commands/unassign-property.command';
import { GetUserPropertiesQuery } from 'src/properties/application/queries/get-user-properties.query';
import { UserAuthGuard } from 'src/auth/application/guards/user-auth.guard';
import { AdminAuthGuard } from 'src/auth/application/guards/admin-auth.guard';
import { UnassignPropertyDto } from '../dto/unassign-property.dto';

@ApiBearerAuth()
@ApiTags('Property User Assignment')
@Controller('property-user')
export class PropertyUserController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @UseGuards(AdminAuthGuard)
    @Post('assign')
    @ApiOperation({ summary: 'اختصاص دادن اموال به کاربر (ادمین)' })
    assign(@Body() dto: AssignPropertyDto) {
        const command = new AssignPropertyCommand(
            dto.userId, dto.propertyIds
        );
        return this.commandBus.execute(command);
    }

    @UseGuards(AdminAuthGuard)
    @Delete('unassign')
    @ApiOperation({ summary: 'حذف اموال از کاربر (ادمین)' })
    unassign(@Body() dto: UnassignPropertyDto) {
        const command = new UnassignPropertyCommand(
            dto.userId, dto.propertyId
        );
        return this.commandBus.execute(command);
    }

    @UseGuards(UserAuthGuard)
    @Get('my-properties')
    @ApiOperation({ summary: 'لیست اموال اختصاص داده شده به کاربر (برای کاربر)' })
    getUserProperties(@Req() req) {
        return this.queryBus.execute(new GetUserPropertiesQuery(req.user.id));
    }

    @UseGuards(UserAuthGuard)
    @Get('user-properties/:userId')
    @ApiOperation({ summary: 'لیست اموال اختصاص داده شده به کاربر (برای ادمین)' })
    getUserPropertiesByAdmin(@Param('userId') userId: number) {
        return this.queryBus.execute(new GetUserPropertiesQuery(userId));
    }
}
