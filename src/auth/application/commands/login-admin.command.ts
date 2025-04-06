export class LoginAdminCommand {
    constructor(
        public readonly phoneNumber: string,
        public readonly password: string,
    ) { }
}
