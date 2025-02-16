import { Controller, Post, Get, Patch, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { DeleteUserCommand } from 'src/auth/application/commands/delete-user.command';
import { GetUserByIdQuery } from 'src/auth/application/queries/get-user-by-id.query';
import { GetAllUsersQuery } from 'src/auth/application/queries/get-all-users.query';
import { UpdateUserCommand } from 'src/auth/application/commands/update-user.command';
import { UserAuthGuard } from 'src/auth/application/guards/user-auth.guard';
import { GetAllUsersWithTeamQuery } from 'src/auth/application/queries/get-all-users-with-team.query';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) { }

    // @Policies()
    // @UseGuards(UserAuthGuard, PoliciesGuard)
    @UseGuards(UserAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'ایجاد کاربر جدید' })
    @ApiResponse({ status: 201, description: 'کاربر با موفقیت ایجاد شد.' })
    @ApiResponse({ status: 400, description: 'اطلاعات وارد شده نامعتبر است.' })
    async createUser(@Body() dto: CreateUserDto) {
        return await this.commandBus.execute(
            new CreateUserCommand(dto.teamId, dto.name, dto.profileImage, dto.lastname, dto.phoneNumber, dto.password, dto.role),
        );
    }

    @Get()
    @ApiOperation({ summary: 'دریافت لیست کاربران' })
    @ApiResponse({ status: 200, description: 'لیست کاربران بازگردانده شد.' })
    async getAllUsers() {
        return await this.queryBus.execute(new GetAllUsersQuery()); // Placeholder
    }

    @Get('with-team')
    @ApiOperation({ summary: 'دریافت لیست کاربران' })
    @ApiResponse({ status: 200, description: 'لیست کاربران بازگردانده شد.' })
    async getAllUsersWithTeam() {
        return await this.queryBus.execute(new GetAllUsersWithTeamQuery()); // Placeholder
    }

    @Get(':id')
    @ApiOperation({ summary: 'دریافت اطلاعات یک کاربر' })
    @ApiResponse({ status: 200, description: 'اطلاعات کاربر بازگردانده شد.' })
    @ApiResponse({ status: 404, description: 'کاربر مورد نظر یافت نشد.' })
    async getUserById(@Param('id') id: number) {
        return await this.queryBus.execute(new GetUserByIdQuery(id));
    }

    @Patch(':id')
    @ApiOperation({ summary: 'به‌روزرسانی اطلاعات یک کاربر' })
    @ApiResponse({ status: 200, description: 'اطلاعات کاربر به‌روزرسانی شد.' })
    @ApiResponse({ status: 404, description: 'کاربر مورد نظر یافت نشد.' })
    async updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto) {
        return await this.commandBus.execute(
            new UpdateUserCommand(
                id,
                dto.name,
                dto.phoneNumber,
                dto.password,
                dto.role
            )
        );
    }

    @Delete(':id')
    @ApiOperation({ summary: 'حذف یک کاربر' })
    @ApiResponse({ status: 200, description: 'کاربر با موفقیت حذف شد.' })
    @ApiResponse({ status: 404, description: 'کاربر مورد نظر یافت نشد.' })
    async deleteUser(@Param('id') id: number) {
        return await this.commandBus.execute(new DeleteUserCommand(id));
    }
}
