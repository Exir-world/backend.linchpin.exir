import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UserSessionEntity } from '../entities/user-session.entity';
import { UserSessionSharedRepository } from 'src/auth/application/ports/user-session-shared.repository';

@Injectable()
export class UserSessionSharedRepositoryImpl implements UserSessionSharedRepository {
    constructor(
        @InjectRepository(UserSessionEntity)
        private readonly userSessionRepository: Repository<UserSessionEntity>,
    ) { }

    async getFirebaseTokens(userIds: number[]): Promise<{ userId: number; firebaseToken: string }[]> {
        const now = new Date();

        // همه سشن‌های فعال و معتبر کاربران
        const allSessions = await this.userSessionRepository.find({
            where: {
                user: { id: In(userIds) },
                isActive: true,
                // jwtExpires: () => `expires_at > NOW()`, // معادل: expiresAt > now
            },
            order: {
                id: 'DESC',
            },
            relations: ['user']
        });

        // انتخاب فقط آخرین سشن معتبر برای هر کاربر
        const latestSessionsByUser = new Map<number, UserSessionEntity>();

        for (const session of allSessions) {
            if (!latestSessionsByUser.has(session.user.id)) {
                latestSessionsByUser.set(session.user.id, session);
            }
        }

        return Array.from(latestSessionsByUser.values())
            .filter((s) => !!s.firebaseToken)
            .map((s) => ({
                userId: s.user.id,
                firebaseToken: s.firebaseToken,
            }));
    }
}
