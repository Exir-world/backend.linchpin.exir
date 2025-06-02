export class LoginCommand {
    constructor(
        public readonly phoneNumber: string,
        public readonly password: string,
        public readonly firebaseToken?: string,
    ) { }
}
