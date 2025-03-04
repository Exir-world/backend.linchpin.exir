import { Controller, Post, Body, Req, HttpCode, HttpStatus, Get, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/application/services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { Tokens } from 'src/auth/application/interfaces/token.interface';
import { LoginCommand } from 'src/auth/application/commands/login.command';
import { RefreshDto } from '../dto/refresh-token.dto';
import { RefreshTokenCommand } from 'src/auth/application/commands/refresh-token.command';
import { I18nService } from 'nestjs-i18n';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly i18n: I18nService,
    ) { }

    @Get('test')
    @ApiResponse({ status: 200, description: 'Test multi lang' })
    async test(@Req() req): Promise<any> {
        throw new BadRequestException(this.i18n.t('test.test'))
        return {
            lang: req.headers['accept-language'],
            test: this.i18n.t('test.test'),
        }
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Login successful' })
    async login(@Body() loginDto: LoginDto): Promise<Tokens> {
        return this.authService.login(
            new LoginCommand(
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
