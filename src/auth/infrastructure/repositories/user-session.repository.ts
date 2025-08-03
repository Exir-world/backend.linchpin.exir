import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserSessionEntity } from '../entities/user-session.entity';
import { UserSessionRepository } from 'src/auth/application/ports/user-session.repository';

@Injectable()
export class UserSessionRepositoryImpl implements UserSessionRepository {
    constructor(
        @InjectRepository(UserSessionEntity)
        private readonly sessionRepository: Repository<UserSessionEntity>,
    ) { }

    async getFirebaseTokensByUserIds(userIds: number[]): Promise<{ userId: number; firebaseToken: string }[]> {
        const firebases = await this.sessionRepository.find({
            where: { user: { id: In(userIds) }, isActive: true },
            relations: ['user'],
            select: ['user', 'firebaseToken'],
        });

        return firebases.map((session) => ({
            userId: session.user.id,
            firebaseToken: session.firebaseToken,
        }));
    }

    async getSessionWithRefresh(refreshToken: string): Promise<UserSessionEntity> {
        return this.sessionRepository.findOne({
            where: { refreshToken, isActive: true },
            relations: ['user', 'user.role'],
        });
    }

    async saveSession(userId: number, refreshToken: string, expires: number, firebaseToken?: string, isAdmin?: boolean): Promise<void> {
        await this.sessionRepository.update({ user: { id: userId }, isAdmin }, { isActive: false });

        const session = new UserSessionEntity();
        session.refreshToken = refreshToken;
        session.user = { id: userId } as any; // Simplified for brevity
        session.jwtExpires = expires;
        session.firebaseToken = firebaseToken;
        session.isAdmin = isAdmin;
        await this.sessionRepository.save(session);
    }
}
