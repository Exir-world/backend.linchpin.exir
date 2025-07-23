export class UserCheckpointAssign {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly checkpointId: number,
    public readonly startDate: Date,
    public readonly endDate: Date,
  ) { }
}
