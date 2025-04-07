export class CreateUserCommand {
    constructor(
        public readonly organizationId: number,
        public readonly name: string,
        public readonly profileImage: string,
        public readonly lastname: string,
        public readonly phoneNumber: string,
        public readonly password: string,
        public readonly role: number,
        public readonly settings: any,
        public readonly firstname: string,
        public readonly nationalCode: string,
        public readonly personnelCode: string,
    ) { }
}
