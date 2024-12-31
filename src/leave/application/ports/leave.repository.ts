import { Leave } from '../../domain/leave';

export abstract class LeaveRepository {
    /**
     * ثبت درخواست مرخصی توسط کاربر
     */
    abstract createLeaveRequest(leave: Leave): Promise<Leave>;

    /**
     * دریافت لیست درخواست‌های مرخصی توسط کاربر
     */
    abstract getUserLeaveRequests(userId: number): Promise<Leave[]>;
}
