import { CreateOrUpdateOrganizationDto } from "src/organization/presentation/dto/create-or-update-organization.dto";

export class CreateOrganizationCommand {
    public readonly name: string;
    public readonly description?: string;
    public readonly address?: string;
    public readonly creatorId: number;

    constructor(dto: CreateOrUpdateOrganizationDto, creatorId: number) {
        this.name = dto.name;
        this.description = dto.description;
        this.address = dto.address;
        this.creatorId = creatorId;
    }
}
