import { RequestType } from "src/requests/domain/enums/request-type.enum";

export class CreateRequestCommand {
    constructor(
        public userId: number,
        public type: RequestType,
        public description?: string,
        public startTime?: Date,
        public endTime?: Date
    ) { }
}
