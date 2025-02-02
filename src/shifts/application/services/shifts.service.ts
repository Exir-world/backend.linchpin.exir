import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ShiftsSharedPort } from '../ports/shifts-shared.port';
import { Shift } from 'src/shifts/domain/shift.domain';
import { GetShiftQuery } from '../queries/get-shift.query';
import { GetShiftsQuery } from '../queries/get-shifts.query';
import { GetShiftsByIdQuery } from '../queries/get-shifts-by-id.query';

@Injectable()
export class ShiftsService implements ShiftsSharedPort {
    constructor(
        private readonly queryBus: QueryBus,
    ) { }

    getShift(id: number): Promise<Shift> {
        return this.queryBus.execute(new GetShiftQuery(id));
    }

    getAllShifts(): Promise<Shift[]> {
        return this.queryBus.execute(new GetShiftsQuery());
    }

    getShifts(ids: number[]): Promise<Shift[]> {
        return this.queryBus.execute(new GetShiftsByIdQuery(ids));
    }
}