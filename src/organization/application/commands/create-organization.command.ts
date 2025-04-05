import { CreateOrganizationDto } from "src/organization/presentation/dto/create-organization.dto";

export class CreateOrganizationCommand {
    public readonly name: string;
    public readonly description?: string;
    public readonly address?: string;
    public readonly creatorId: number;

    constructor(dto: CreateOrganizationDto, creatorId: number) {
        this.name = dto.name;
        this.description = dto.description;
        this.address = dto.address;
        this.creatorId = creatorId;
    }
}
