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
import { GetRequestTypesQuery } from '../application/queries/get-request-types.query';
import { GetRequestsUserDto } from './dto/get-requests-user.dto';
import { GetRequestByIdQuery } from '../application/queries/get-request-by-id.query';
import { SharedNotificationService } from 'src/shared-notification/shared-notification.service';
import { SharedUsersService } from 'src/shared-user/shared-user.service';
import { RequestType } from '../domain/enums/request-type.enum';
import { I18nService } from 'nestjs-i18n';
import { PermissionsGuard } from 'src/auth/application/guards/permission.guard';
import { Permission } from 'src/auth/domain/enums/permission.enum';
import { Permissions } from 'src/auth/application/decorators/permissions.decorator';

function toCamelCase(value: string): string {
    return value.toLowerCase().replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}


@ApiBearerAuth()
@ApiTags('Requests') // نام بخش در Swagger
@Controller('requests')
export class RequestController {
    constructor(
        private readonly requestService: RequestService,
        private readonly userService: SharedUsersService,
        private readonly notifier: SharedNotificationService,
        private readonly i18n: I18nService
    ) { }

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
        const organizationId = req.user.organizationId;

        const command = new CreateRequestCommand(
            req.user.id, // فرض بر اینکه userId در JWT موجود است
            dto.type,
            dto.description,
            dto.startTime,
            dto.endTime
        );
        const request = await this.requestService.createRequest(command);

        const users = await this.userService.getUsers({ userIds: [req.user.id] });

        const user = users[0];

        const enumKey = toCamelCase(RequestType[dto.type]);

        const typeTitle = this.i18n.t(`request.types.${enumKey}`, { lang: 'fa' });

        this.notifier.sendToAdmins(organizationId, {
            title: 'درخواست جدید',
            message: `درخواست ${typeTitle} توسط ${user?.firstname || ''} ${user?.lastname || ''} ثبت شد`,
        }, [Permission.ReadRequest]);

        return request;
    }

    @Permissions(Permission.ReviewRequest)
    @UseGuards(UserAuthGuard, PermissionsGuard)
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

    @Permissions(Permission.ReadRequest)
    @UseGuards(UserAuthGuard, PermissionsGuard)
    @ApiOperation({ summary: 'دریافت درخواست‌ها با وضعیت (اختیاری)' })
    @ApiResponse({ status: 200, description: 'لیست درخواست‌ها بازگردانده شد.' })
    @Get()
    async getAllRequests(@Query() dto: GetAllRequestsDto) {
        const query = new GetAllRequestsQuery(dto.status, dto.userId);
        return await this.requestService.getAllRequests(query);
    }

    @Permissions(Permission.ReadRequest)
    @UseGuards(UserAuthGuard, PermissionsGuard)
    @ApiOperation({ summary: 'دریافت درخواست بر اساس شناسه' })
    @ApiResponse({ status: 200, description: 'درخواست بازگردانده شد.' })
    @ApiResponse({ status: 404, description: 'درخواست پیدا نشد.' })
    @Get(':id(\\d+)')
    async getRequestById(@Param('id') requestId: number) {
        const query = new GetRequestByIdQuery(requestId);
        return await this.requestService.getRequestById(query);
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
        console.log('xxx111');

        return await this.requestService.getRequestTypes(new GetRequestTypesQuery());
    }
}
