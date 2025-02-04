import { Controller, Post, Get, Body, Param, Req, Query, Put, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { CreateRequestDto } from './dto/create-request.dto';
import { CreateRequestCommand } from '../application/commands/create-request.command';
import { ReviewRequestDto } from './dto/review-request.dto';
import { ReviewRequestCommand } from '../application/commands/review-request.command';
import { GetAllRequestsDto } from './dto/get-requests.dto';
import { GetAllRequestsQuery } from '../application/queries/get-all-requests.query';
import { GetUserRequestsQuery } from '../application/queries/get-user-requests.query';
import { RequestService } from '../application/services/requests.service';
import { CancelRequestCommand } from '../application/commands/cancel-request.command';
import { UserAuthGuard } from 'src/auth/application/guards/user-auth.guard';
import { AdminAuthGuard } from 'src/auth/application/guards/admin-auth.guard';
import { GetRequestTypesQuery } from '../application/queries/get-request-types.query';
import { GetRequestsUserDto } from './dto/get-requests-user.dto';

@ApiBearerAuth()
@ApiTags('Requests') // نام بخش در Swagger
@Controller('requests')
export class RequestController {
    constructor(private readonly requestService: RequestService) { }

    @UseGuards(UserAuthGuard)
    @ApiOperation({ summary: 'ایجاد درخواست جدید' })
    @ApiResponse({ status: 201, description: 'درخواست با موفقیت ایجاد شد.' })
    @ApiResponse({ status: 400, description: 'ورودی نامعتبر.' })
    @ApiBody({ type: CreateRequestDto })
    @Post('create')
    async createRequest(
        @Body() dto: CreateRequestDto,
        @Request() req: any // درخواست‌کننده برای userId
    ) {
        const command = new CreateRequestCommand(
            req.user.id, // فرض بر اینکه userId در JWT موجود است
            dto.type,
            dto.description,
            dto.startTime,
            dto.endTime
        );
        return await this.requestService.createRequest(command);
    }

    @UseGuards(AdminAuthGuard)
    @ApiOperation({ summary: 'تایید یا رد درخواست' })
    @ApiResponse({ status: 200, description: 'درخواست بررسی شد.' })
    @ApiResponse({ status: 404, description: 'درخواست پیدا نشد.' })
    @ApiBody({ type: ReviewRequestDto })
    @Post('review')
    async reviewRequest(
        @Body() dto: ReviewRequestDto,
        @Request() req: any // درخواست‌کننده برای adminId
    ) {
        const command = new ReviewRequestCommand(
            dto.requestId,
            req.user.id,
            dto.action,
            dto.adminComment
        );
        return await this.requestService.reviewRequest(command);
    }

    @UseGuards(UserAuthGuard)
    @ApiOperation({ summary: 'دریافت درخواست‌های کاربر' })
    @ApiResponse({ status: 200, description: 'لیست درخواست‌های کاربر' })
    @Get('user')
    async getUserRequests(@Request() req, @Query() dto: GetRequestsUserDto) {
        const query = new GetUserRequestsQuery(
            req.user.id,
            dto.status,
            dto.startTime,
            dto.endTime,
        );
        return await this.requestService.getUserRequests(query);
    }

    @UseGuards(AdminAuthGuard)
    @ApiOperation({ summary: 'دریافت درخواست‌ها با وضعیت (اختیاری)' })
    @ApiResponse({ status: 200, description: 'لیست درخواست‌ها بازگردانده شد.' })
    @Get()
    async getAllRequests(@Query() dto: GetAllRequestsDto) {
        const query = new GetAllRequestsQuery(dto.status);
        return await this.requestService.getAllRequests(query);
    }

    @UseGuards(UserAuthGuard)
    @ApiOperation({ summary: 'لغو درخواست ایجاد شده توسط کاربر' })
    @ApiResponse({ status: 200, description: 'درخواست با موفقیت لغو شد.' })
    @Delete('cancel/:id')
    async cancelRequest(@Param('id') requestId: number, @Request() req) {
        const userId = req.user.id;
        return await this.requestService.cancelRequestByUser(
            new CancelRequestCommand(requestId, userId)
        );
    }

    @ApiOperation({ summary: 'لیست نوع درخواست ها' })
    @ApiResponse({ status: 200, description: 'نوع درخواست ها' })
    @Get('request-types')
    async getRequestTypes() {
        return await this.requestService.getRequestTypes(new GetRequestTypesQuery());
    }
}
