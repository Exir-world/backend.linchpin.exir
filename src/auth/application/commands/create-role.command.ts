import { Permission } from "src/auth/domain/enums/permission.enum";

export class CreateRoleCommand {
  constructor(
    public readonly organizationId: number,
    public readonly name: string,
    public readonly description: string,
    public readonly permissions: Permission[] = [],
  ) { }
}
