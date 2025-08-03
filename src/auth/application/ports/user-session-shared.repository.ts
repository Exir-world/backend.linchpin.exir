export abstract class UserSessionSharedRepository {
    abstract getFirebaseTokens(userIds: number[], isAdmin?: boolean): Promise<{ userId: number; firebaseToken: string; }[]>;
}
