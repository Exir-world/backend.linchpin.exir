import { PropertyStatusEnum } from "src/properties/domain/enums/property-status.enum";

export class UpdatePropertyCommand {
    constructor(
        public readonly id: number,
        public readonly categoryId?: number,
        public readonly code?: string,
        public readonly status?: PropertyStatusEnum,
        public readonly organizationId?: number,
        public readonly departmentId?: number,
        public readonly brand?: string,
        public readonly model?: string,
        public readonly description?: string,
        public readonly imageUrl?: string,
    ) { }
}
