import { RequestStatus } from "src/requests/domain/enums/request-status.enum";

export class GetAllRequestsQuery {
    constructor(public status?: RequestStatus) { }
}
