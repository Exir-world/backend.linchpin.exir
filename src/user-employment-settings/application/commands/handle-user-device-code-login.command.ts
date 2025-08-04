export class HandleUserDeviceCodeLoginCommand {
    constructor(
        public readonly userId: number,
        public readonly deviceUniqueCode: string,
    ) { }
}
