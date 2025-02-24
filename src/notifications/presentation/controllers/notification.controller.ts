import { Body, Controller, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { GetNotificationsDto } from '../dto/get-notifications.dto';
import { MarkAsReadDto } from '../dto/mark-as-read.dto';
import { CreateNotificationCommand } from 'src/notifications/application/commands/create-notification.command';
import { GetNotificationsQuery } from 'src/notifications/application/queries/get-notifications.query';
import { MarkAsReadCommand } from 'src/notifications/application/commands/mark-as-read.command';
import { UserAuthGuard } from 'src/auth/application/guards/user-auth.guard';

@ApiBearerAuth()
@ApiTags('Notifications')
@Controller('notifications')
export class NotificationController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    @Post()
    @ApiOperation({ summary: 'ایجاد نوتیفیکیشن جدید' })
    @ApiResponse({ status: 201, description: 'نوتیفیکیشن ایجاد شد.' })
    async create(@Body() dto: CreateNotificationDto) {
        return this.commandBus.execute(new CreateNotificationCommand(dto.userId, dto.type, dto.title, dto.description));
    }

    @UseGuards(UserAuthGuard)
    @Get()
    @ApiOperation({ summary: 'دریافت لیست نوتیفیکیشن‌های کاربر با Pagination' })
    @ApiResponse({ status: 200, description: 'لیست نوتیفیکیشن‌ها' })
    async getAll(@Request() req, /*@Query() dto: GetNotificationsDto*/) {
        return this.queryBus.execute(new GetNotificationsQuery(req.user.id/*, dto.page, dto.limit*/));
    }

    @UseGuards(UserAuthGuard)
    @Patch('mark-as-read')
    @ApiOperation({ summary: 'نشان کردن نوتیف‌های خوانده‌شده' })
    @ApiResponse({ status: 200, description: 'نوتیفیکیشن‌ها به عنوان خوانده شده علامت‌گذاری شدند.' })
    async markAsRead(@Request() req, @Body() dto: MarkAsReadDto) {
        return this.commandBus.execute(new MarkAsReadCommand(req.user.id, dto.ids));
    }
}
