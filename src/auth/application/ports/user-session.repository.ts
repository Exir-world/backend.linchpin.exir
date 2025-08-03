import { UserSessionEntity } from "src/auth/infrastructure/entities/user-session.entity";

export abstract class UserSessionRepository {
    abstract saveSession(userId: number, refreshToken: string, expires: number, firebaseToken?: string, isAdmin?: boolean): Promise<void>;
    abstract getSessionWithRefresh(refreshToken: string): Promise<UserSessionEntity>;
    abstract getFirebaseTokensByUserIds(userIds: number[]): Promise<{ userId: number; firebaseToken: string }[]>;
}
