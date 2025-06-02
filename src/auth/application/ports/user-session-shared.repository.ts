export abstract class UserSessionSharedRepository {
    abstract getFirebaseTokens(userIds: number[]): Promise<{ userId: number; firebaseToken: string; }[]>;
}
