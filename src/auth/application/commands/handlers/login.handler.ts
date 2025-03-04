import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginCommand } from '../login.command';
import { Tokens } from '../../interfaces/token.interface';
import { UserSessionRepository } from '../../ports/user-session.repository';
import { UserRepository } from '../../ports/user.repository';
import { ConfigService } from '@nestjs/config';
import { calculateJwtExpiresAt } from '../../utils/ms.util';
import { I18nService } from 'nestjs-i18n';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly sessionRepository: UserSessionRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly i18n: I18nService,
    ) { }

    jwtSecret = this.configService.get('JWT_SECRET');
    jwtExpires = this.configService.get('JWT_EXPIRES') || '30d';

    refreshSecret = this.configService.get('REFRESH_SECRET');
    refreshExpires = this.configService.get('REFRESH_EXPIRES') || '90d';

    async execute(command: LoginCommand): Promise<Tokens> {
        const { phoneNumber, password } = command;

        if (!phoneNumber || !password) {
            throw new BadRequestException(this.i18n.t('auth.login.validation'));
        }

        // Verify user credentials
        const user = await this.userRepository.findByPhoneNumber(phoneNumber);
        if (!user || user.password !== password) {
            throw new BadRequestException(this.i18n.t('auth.login.invalidCredentials'));
        }

        // Generate tokens
        const payload = { id: user.id, role: user.role.name };
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.jwtExpires,
            secret: this.jwtSecret,
        });

        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.refreshExpires,
            secret: this.refreshSecret,
        });

        const expires = calculateJwtExpiresAt(this.jwtExpires);

        // Save refresh token in session
        await this.sessionRepository.saveSession(user.id, refreshToken, expires);


        return { accessToken, refreshToken, expires };
    }
}
