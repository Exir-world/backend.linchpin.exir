import { Permission } from "src/auth/domain/enums/permission.enum";

export class UpdateRoleCommand {
  constructor(
    public readonly id: number,
    public readonly name?: string,
    public readonly description?: string,
    public readonly permissions: Permission[] = [],
  ) { }
}
