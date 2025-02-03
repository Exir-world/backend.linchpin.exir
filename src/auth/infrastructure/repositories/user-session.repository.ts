import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSessionEntity } from '../entities/user-session.entity';
import { UserSessionRepository } from 'src/auth/application/ports/user-session.repository';

@Injectable()
export class UserSessionRepositoryImpl implements UserSessionRepository {
    constructor(
        @InjectRepository(UserSessionEntity)
        private readonly sessionRepository: Repository<UserSessionEntity>,
    ) { }

    async getSessionWithRefresh(refreshToken: string): Promise<UserSessionEntity> {
        return this.sessionRepository.findOne({
            where: { refreshToken, isActive: true },
            relations: ['user', 'user.role'],
        });
    }

    async saveSession(userId: number, refreshToken: string, expires: number): Promise<void> {
        await this.sessionRepository.update({ user: { id: userId } }, { isActive: false });

        const session = new UserSessionEntity();
        session.refreshToken = refreshToken;
        session.user = { id: userId } as any; // Simplified for brevity
        session.jwtExpires = expires;
        await this.sessionRepository.save(session);
    }
}
