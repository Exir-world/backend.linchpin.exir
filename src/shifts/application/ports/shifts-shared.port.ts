import { Shift } from "src/shifts/domain/shift.domain";

export interface ShiftsSharedPort {
    getShift(id: number): Promise<Shift>;
    getAllShifts(): Promise<Shift[]>;
    getShifts(ids: number[]): Promise<Shift[]>;
}