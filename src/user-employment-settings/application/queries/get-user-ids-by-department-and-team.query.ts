export class GetUserIdsByDepartmentAndTeamQuery {
  constructor(
    public readonly departmentId?: number,
    public readonly teamId?: number,
  ) { }
}