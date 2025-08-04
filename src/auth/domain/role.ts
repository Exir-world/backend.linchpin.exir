import { Permission } from 'src/auth/domain/enums/permission.enum';

export class Role {
    constructor(
        public readonly name: string,
        public readonly permissions: Permission[] = [],
        public readonly id: number = 0,
        public readonly description: string = '',
    ) {
        if (!name || name.trim() === '') {
            throw new Error('Role name cannot be empty.');
        }
    }

    addPermission(permission: Permission): void {
        if (this.permissions.includes(permission)) {
            throw new Error(`Permission "${permission}" already exists for role "${this.name}".`);
        }
        this.permissions.push(permission);
    }

    removePermission(permission: Permission): void {
        const index = this.permissions.indexOf(permission);
        if (index === -1) {
            throw new Error(`Permission "${permission}" does not exist for role "${this.name}".`);
        }
        this.permissions.splice(index, 1);
    }
}
