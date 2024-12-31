export class Permission {
    constructor(
        public readonly name: string,
        public readonly id: number = 0
    ) {
        if (!name || name.trim() === '') {
            throw new Error('Permission name cannot be empty.');
        }
        this.name = name.trim();
    }
}
