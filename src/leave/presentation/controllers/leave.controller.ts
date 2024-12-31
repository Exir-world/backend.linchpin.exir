import { Controller, Post, Get, Body, Req, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LeaveService } from '../../application/services/leave.service';
import { CreateLeaveCommand } from '../../application/commands/create-leave.command';
import { GetUserLeavesQuery } from '../../application/queries/get-user-leaves.query';
import { CreateLeaveDto } from '../dto/create-leave.dto';
import { Leave } from '../../domain/leave';
import { AdminAuthGuard } from 'src/auth/application/guards/admin-auth.guard';
import { UserAuthGuard } from 'src/auth/application/guards/user-auth.guard';

@ApiBearerAuth()
@ApiTags('Leave')
@Controller('leave')
export class LeaveController {
    constructor(private readonly leaveService: LeaveService) { }

    @UseGuards(AdminAuthGuard)
    @ApiOperation({ summary: 'ثبت مرخصی توسط ادمین' })
    @ApiResponse({ status: 201, description: 'مرخصی با موفقیت ثبت شد.' })
    @Post('create')
    async createLeave(@Body() createLeaveDto: CreateLeaveDto): Promise<void> {
        const command = new CreateLeaveCommand(
            createLeaveDto.userId,
            createLeaveDto.type,
            createLeaveDto.description,
            createLeaveDto.startTime,
            createLeaveDto.endTime,
        );
        await this.leaveService.createLeave(command);
    }

    @UseGuards(UserAuthGuard)
    @ApiOperation({ summary: 'دریافت لیست مرخصی‌های کاربر' })
    @ApiResponse({ status: 200, description: 'لیست مرخصی‌های کاربر بازگردانده شد.' })
    @Get('user')
    async getUserLeaves(@Request() req): Promise<Leave[]> {
        const query = new GetUserLeavesQuery(req.user.id);
        return await this.leaveService.getUserLeaves(query);
    }
}
