import { UserCheckPointAttachment } from "./user-check-point-attachment.domain";

export class UserCheckPoint {
    constructor(
        public readonly id: number,
        public readonly userId: number,
        public readonly lat: number,
        public readonly lng: number,
        public readonly report: boolean,
        public readonly checkPointId: number,
        public readonly createdAt: Date,
        public readonly attachments: UserCheckPointAttachment[] = [],
    ) { }
}
