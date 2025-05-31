export class CheckPointItem {
  constructor(
    public readonly id: number,
    public readonly lat: number,
    public readonly lng: number,
    public radius: number,
    public needReport: boolean,
    public readonly checkPointId: number,
  ) { }
}
