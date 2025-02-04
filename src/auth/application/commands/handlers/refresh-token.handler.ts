import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from '../../interfaces/token.interface';
import { UserSessionRepository } from '../../ports/user-session.repository';
import { UserRepository } from '../../ports/user.repository';
import { ConfigService } from '@nestjs/config';
import { calculateJwtExpiresAt } from '../../utils/ms.util';
import { RefreshTokenCommand } from '../refresh-token.command';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler implements ICommandHandler<RefreshTokenCommand> {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly sessionRepository: UserSessionRepository,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    jwtSecret = this.configService.get('JWT_SECRET');
    jwtExpires = this.configService.get('JWT_EXPIRES') || '30d';

    refreshSecret = this.configService.get('REFRESH_SECRET');
    refreshExpires = this.configService.get('REFRESH_EXPIRES') || '90d';

    async execute(command: RefreshTokenCommand): Promise<Tokens> {

        const session = await this.sessionRepository.getSessionWithRefresh(command.refreshToken);
        if (!session)
            throw new BadRequestException();

        // Generate tokens
        const payload = { id: session.user.id, role: session.user.role.name };
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
        await this.sessionRepository.saveSession(session.user.id, refreshToken, expires);

        return { accessToken, refreshToken, expires };
    }
}
