export class CreateUserCommand {
    constructor(
        public readonly teamId: number,
        public readonly name: string,
        public readonly profileImage: string,
        public readonly lastname: string,
        public readonly phoneNumber: string,
        public readonly password: string,
        public readonly role: number,
    ) { }
}
