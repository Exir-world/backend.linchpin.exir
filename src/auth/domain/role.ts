import { Permission } from './permission';

export class Role {
    constructor(
        public readonly name: string,
        public readonly permissions: Permission[] = [],
        public readonly id: number = 0,
    ) {
        if (!name || name.trim() === '') {
            throw new Error('Role name cannot be empty.');
        }
    }

    addPermission(permission: Permission): void {
        if (this.permissions.some((perm) => perm.name === permission.name)) {
            throw new Error(`Permission "${permission.name}" already exists for role "${this.name}".`);
        }
        this.permissions.push(permission);
    }

    removePermission(permissionName: string): void {
        const index = this.permissions.findIndex((perm) => perm.name === permissionName);
        if (index === -1) {
            throw new Error(`Permission "${permissionName}" does not exist for role "${this.name}".`);
        }
        this.permissions.splice(index, 1);
    }
}
