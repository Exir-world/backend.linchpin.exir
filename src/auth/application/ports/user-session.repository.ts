export abstract class UserSessionRepository {
    abstract saveSession(userId: number, refreshToken: string, expires: number): Promise<void>;
}
