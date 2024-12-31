export class CreateUserCommand {
    constructor(
        public readonly name: string,
        public readonly phoneNumber: string,
        public readonly password: string,
        public readonly role: number,
    ) { }
}
