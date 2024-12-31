export class UpdateUserCommand {
    constructor(
        public readonly id: number,
        public readonly name?: string,
        public readonly phoneNumber?: string,
        public readonly password?: string,
        public readonly role?: number,
    ) { }
}
