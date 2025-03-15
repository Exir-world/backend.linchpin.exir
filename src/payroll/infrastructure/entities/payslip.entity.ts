import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity('payslips')
export class Payslip {
    @PrimaryGeneratedColumn()
    id: number; // آیدی عددی

    @Column()
    userId: number; // شناسه کاربر

    @CreateDateColumn()
    date: Date; // تاریخ فیش

    @CreateDateColumn()
    paymentDate: Date; // تاریخ واریز

    @Column({ type: 'int' })
    standardWorkDays: number; // کارکرد استاندارد

    @Column({ type: 'int' })
    netWorkDays: number; // کارکرد خالص

    @Column({ type: 'int', default: 0 })
    absentMinutes: number; // کسری کار به دقیقه

    @Column({ type: 'int', default: 0 })
    overtimeMinutes: number; // اضافه کار به دقیقه

    @Column({ type: 'int', default: 0 })
    leaveMinutes: number; // مرخصی به دقیقه

    @Column({ type: 'int', default: 0 })
    missionMinutes: number; // ماموریت به دقیقه

    // --- مبالغ ---

    @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
    baseSalary: number; // حقوق پایه

    @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
    seniorityPay: number; // پایه سنوات

    @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
    overtimePay: number; // اضافه کار

    @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
    insuranceFee: number; // حق بیمه

    @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
    bonus: number; // عیدی

    @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
    totalAmount: number; // جمع کل

    @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
    netPayable: number; // خالص دریافتی
}
