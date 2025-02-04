import { RequestStatus } from "src/requests/domain/enums/request-status.enum";
import { RequestDomain } from "src/requests/domain/request";

export abstract class RequestRepository {
    abstract save(request: RequestDomain): Promise<RequestDomain>;
    abstract findOneById(id: number): Promise<RequestDomain | null>;
    abstract findByUserId(userId: number): Promise<RequestDomain[]>;
    abstract findByStatus(status: RequestStatus): Promise<RequestDomain[]>;
    abstract filterByTimeRangeAndStatus(userId: number, status: RequestStatus, startTime: Date, endTime: Date): Promise<RequestDomain[]>;
}
