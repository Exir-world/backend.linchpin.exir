import { Controller, Post, Body, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/application/services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { Tokens } from 'src/auth/application/interfaces/token.interface';
import { LoginCommand } from 'src/auth/application/commands/login.command';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

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
}
