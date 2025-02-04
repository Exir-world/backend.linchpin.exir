import { RequestStatus } from "src/requests/domain/enums/request-status.enum";

export class GetUserRequestsQuery {
    constructor(
        public userId: number,
        public status?: RequestStatus,
        public startTime?: Date,
        public endTime?: Date,
    ) { }
}
