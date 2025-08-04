import { Controller, Post, Body, Req, HttpCode, HttpStatus, Get, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/application/services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { Tokens } from 'src/auth/application/interfaces/token.interface';
import { LoginCommand } from 'src/auth/application/commands/login.command';
import { RefreshDto } from '../dto/refresh-token.dto';
import { RefreshTokenCommand } from 'src/auth/application/commands/refresh-token.command';
import { LoginAdminCommand } from 'src/auth/application/commands/login-admin.command';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { HandleUserDeviceCodeLoginCommand } from 'src/user-employment-settings/application/commands/handle-user-device-code-login.command';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly commandBus: CommandBus,
    ) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Login successful' })
    async login(@Body() loginDto: LoginDto): Promise<Tokens> {
        const { deviceUniqueCode, firebase } = loginDto;

        const { tokenData, userId } = await this.authService.login(
            new LoginCommand(
                loginDto.phoneNumber,
                loginDto.password,
                firebase,
            )
        );

        await this.commandBus.execute(new HandleUserDeviceCodeLoginCommand(userId, deviceUniqueCode));

        return tokenData;
    }

    @Post('login/admin')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Login successful' })
    async loginAdmin(@Body() loginDto: LoginDto): Promise<Tokens> {
        const data = await this.authService.login(
            new LoginAdminCommand(
                loginDto.phoneNumber,
                loginDto.password,
                loginDto.firebase,
            )
        );

        return data;
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200 })
    async refresh(@Body() refreshDto: RefreshDto): Promise<Tokens> {
        return this.authService.refreshToken(
            new RefreshTokenCommand(refreshDto.refreshToken)
        );
    }

    @Post('login/admin')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Login successful' })
    async loginAdmin(@Body() loginDto: LoginDto): Promise<Tokens> {
        return this.authService.login(
            new LoginAdminCommand(
                loginDto.phoneNumber,
                loginDto.password
            )
        );
    }

    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200 })
    async refresh(@Body() refreshDto: RefreshDto): Promise<Tokens> {
        return this.authService.refreshToken(
            new RefreshTokenCommand(refreshDto.refreshToken)
        );
    }
}
