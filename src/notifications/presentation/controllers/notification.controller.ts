import { Body, Controller, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { MarkAsReadDto } from '../dto/mark-as-read.dto';
import { CreateNotificationCommand } from 'src/notifications/application/commands/create-notification.command';
import { GetNotificationsQuery } from 'src/notifications/application/queries/get-notifications.query';
import { MarkAsReadCommand } from 'src/notifications/application/commands/mark-as-read.command';
import { UserAuthGuard } from 'src/auth/application/guards/user-auth.guard';
import { MarkAsReadMultiDto } from '../dto/mark-as-read-multi.dto';

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
        const res = await this.queryBus.execute(new GetNotificationsQuery(req.user.id/*, dto.page, dto.limit*/));
        await this.commandBus.execute(new MarkAsReadCommand(req.user.id, res.notifications.map(n => n.id)));

        return res;
    }

    @UseGuards(UserAuthGuard)
    @Patch('mark-as-read')
    @ApiOperation({ summary: 'نشان کردن نوتیف‌های خوانده‌شده' })
    @ApiResponse({ status: 200, description: 'نوتیفیکیشن‌ها به عنوان خوانده شده علامت‌گذاری شدند.' })
    async markAsRead(@Request() req, @Body() dto: MarkAsReadDto) {
        return this.commandBus.execute(new MarkAsReadCommand(req.user.id, [dto.id]));
    }

    @UseGuards(UserAuthGuard)
    @Patch('mark-as-read-multi')
    @ApiOperation({ summary: 'نشان کردن نوتیف‌های خوانده‌شده' })
    @ApiResponse({ status: 200, description: 'نوتیفیکیشن‌ها به عنوان خوانده شده علامت‌گذاری شدند.' })
    async markAsReadMulti(@Request() req, @Body() dto: MarkAsReadMultiDto) {
        return this.commandBus.execute(new MarkAsReadCommand(req.user.id, dto.ids));
    }
}
