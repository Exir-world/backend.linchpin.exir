import { User } from "src/auth/domain/user";

export abstract class UserRepository {
    abstract findByPhoneNumber(phoneNumber: string): Promise<User>;
    abstract save(user: User): Promise<User>;
    abstract findAll(): Promise<User[]>;
    abstract findById(id: number): Promise<User | null>;
    abstract delete(id: number): Promise<void>;
}
