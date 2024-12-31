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

    async saveSession(userId: number, refreshToken: string): Promise<void> {
        const session = new UserSessionEntity();
        session.refreshToken = refreshToken;
        session.user = { id: userId } as any; // Simplified for brevity
        await this.sessionRepository.save(session);
    }
}
