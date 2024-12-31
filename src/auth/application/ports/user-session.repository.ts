export abstract class UserSessionRepository {
    abstract saveSession(userId: number, refreshToken: string): Promise<void>;
}
