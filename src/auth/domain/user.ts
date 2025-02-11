// src/modules/auth/domain/user.ts
import { Role } from './role';

export class User {
    constructor(
        public teamId: number,
        public name: string,
        public profileImage: string,
        public lastname: string,
        public phoneNumber: string,
        public password: string,
        public role: Role,
        public id: number = 0,
    ) {
        if (!name || name.trim() === '') {
            throw new Error('User name cannot be empty.');
        }
        // if (!lastname || lastname.trim() === '') {
        //     throw new Error('User lastname cannot be empty.');
        // }
        if (!phoneNumber || !/^(\+\d{1,3}[- ]?)?\d{10}$/.test(phoneNumber)) {
            throw new Error('Invalid phone number.');
        }
        if (!password || password.length < 6) {
            throw new Error('Password must be at least 6 characters long.');
        }
    }
}
