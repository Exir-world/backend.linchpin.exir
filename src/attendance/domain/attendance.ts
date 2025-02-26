import { DateUtil } from "src/common/utils/date.util";
import { Stop } from "./stop";
import { WorkReport } from "./work-report";

export class Attendance {
    public id: number;
    public userId: number;
    public checkIn: Date;
    public checkOut?: Date;
    public lat?: number;
    public lng?: number;
    public workReport?: WorkReport;
    public stops: Stop[] = [];

    constructor(id: number, userId: number) {
        this.id = id;
        this.userId = userId;
        this.checkIn = DateUtil.nowUTC();
    }

    public setCheckOut(): void {
        if (this.checkOut) {
            throw new Error('User has already checked out.');
        }
        this.checkOut = DateUtil.nowUTC();
    }

    public setLocation(lat?: number, lng?: number): void {
        this.lat = lat;
        this.lng = lng;
    }

    public attachWorkReport(workReport: WorkReport): void {
        if (this.workReport) {
            throw new Error('Work report is already attached to this attendance.');
        }
        this.workReport = workReport;
    }

    public addStop(reason: string): Stop {
        if (this.checkOut) {
            throw new Error('Cannot add stops after checkout.');
        }

        const stop = new Stop(0, this.id, DateUtil.nowUTC(), null, reason);
        this.stops.push(stop);
        return stop;
    }

    public endStop(stopId: number): void {
        const stop = this.stops.find(s => s.getId === stopId);
        if (!stop) {
            throw new Error('Stop not found.');
        }
        stop.endStop();
    }

    public get getId(): number {
        return this.id;
    }

    public get getUserId(): number {
        return this.userId;
    }

    public get getCheckIn(): Date {
        return this.checkIn;
    }

    public get getCheckOut(): Date | undefined {
        return this.checkOut;
    }

    public get getLat(): number | undefined {
        return this.lat;
    }

    public get getLng(): number | undefined {
        return this.lng;
    }

    public get getWorkReport(): WorkReport | undefined {
        return this.workReport;
    }

    public get getStops(): Stop[] {
        return this.stops;
    }
}
