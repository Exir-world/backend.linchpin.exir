// src/modules/auth/domain/user.ts
import { Role } from './role';

export class User {
    constructor(
        public organizationId: number,
        public firstname: string,
        public name: string,
        public email: string,
        public profileImage: string,
        public lastname: string,
        public phoneNumber: string,
        public password: string,
        public role: Role,
        public nationalCode: string,
        public personnelCode: string,
        public isDeleted: boolean,
        public hasAdminPanelAccess: boolean,
        public id: number = 0,
    ) {
        // if (!firstname || firstname.trim() === '') {
        //     throw new Error('User firstname cannot be empty.');
        // }
        // if (!name || name.trim() === '') {
        //     throw new Error('User name cannot be empty.');
        // }
        if (!phoneNumber || !/^(\+\d{1,3}[- ]?)?\d{10}$/.test(phoneNumber)) {
            throw new Error('Invalid phone number.');
        }
        if (!password || password.length < 6) {
            throw new Error('Password must be at least 6 characters long.');
        }
        // if (!nationalCode || nationalCode.trim() === '') {
        //     throw new Error('National code cannot be empty.');
        // }
        // if (!personnelCode || personnelCode.trim() === '') {
        //     throw new Error('Personnel code cannot be empty.');
        // }
    }
}
