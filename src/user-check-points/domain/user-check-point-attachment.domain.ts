export class UserCheckPointAttachment {
  constructor(
    public readonly id: number,
    public readonly filename: string,
    public readonly fileType: string,
    public readonly fileUrl: string,
    public readonly description: string | null,
    public readonly createdAt: Date,
    public readonly userCheckPointId: number,
  ) { }
}
