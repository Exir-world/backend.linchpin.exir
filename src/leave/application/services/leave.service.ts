import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateLeaveCommand } from '../commands/create-leave.command';
import { GetUserLeavesQuery } from '../queries/get-user-leaves.query';
import { Leave } from '../../domain/leave';

@Injectable()
export class LeaveService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    /**
     * ثبت درخواست مرخصی
     */
    async createLeave(command: CreateLeaveCommand): Promise<Leave> {
        return await this.commandBus.execute(command);
    }

    /**
     * دریافت لیست مرخصی‌های کاربر
     */
    async getUserLeaves(query: GetUserLeavesQuery): Promise<Leave[]> {
        return await this.queryBus.execute(query);
    }
}
