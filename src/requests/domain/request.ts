import { RequestStatus } from "./enums/request-status.enum";
import { RequestType } from "./enums/request-type.enum";

export class RequestDomain {
    constructor(
        public id: number,
        public type: RequestType,
        public status: RequestStatus,
        public description?: string,
        public adminComment?: string,
        public userId?: number,
        public startTime?: Date,
        public endTime?: Date,
        public reviewedById?: number,
        public reviewedAt?: Date,
        public createdAt?: Date,
        public updatedAt?: Date,
    ) { }

    approve(adminId: number, comment?: string) {
        this.status = RequestStatus.APPROVED;
        this.reviewedById = adminId;
        this.adminComment = comment;
        this.reviewedAt = new Date();
    }

    reject(adminId: number, comment?: string) {
        this.status = RequestStatus.REJECTED;
        this.reviewedById = adminId;
        this.adminComment = comment;
        this.reviewedAt = new Date();
    }

    cancel() {
        this.status = RequestStatus.CANCELLED;
    }
}
