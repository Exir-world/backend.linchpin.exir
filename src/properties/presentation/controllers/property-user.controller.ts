import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AssignPropertyDto } from '../dto/assign-property.dto';

@ApiBearerAuth()
@ApiTags('Property User Assignment')
@Controller('property-user')
export class PropertyUserController {

    @Post('assign')
    @ApiOperation({ summary: 'اختصاص دادن اموال به کاربر (ادمین)' })
    assign(@Body() dto: AssignPropertyDto) {
        return 'TODO: call service to assign property';
    }

    @Delete('unassign')
    @ApiOperation({ summary: 'حذف اموال از کاربر (ادمین)' })
    unassign(@Body() dto: AssignPropertyDto) {
        return 'TODO: call service to unassign property';
    }

    @Get('my-properties/:userId')
    @ApiOperation({ summary: 'لیست اموال اختصاص داده شده به کاربر (برای کاربر)' })
    getUserProperties(@Param('userId') userId: number) {
        return `TODO: call service to get properties of user ${userId}`;
    }
}
