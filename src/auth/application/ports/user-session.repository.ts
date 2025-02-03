import { UserSessionEntity } from "src/auth/infrastructure/entities/user-session.entity";

export abstract class UserSessionRepository {
    abstract saveSession(userId: number, refreshToken: string, expires: number): Promise<void>;
    abstract getSessionWithRefresh(refreshToken: string): Promise<UserSessionEntity>;
}
