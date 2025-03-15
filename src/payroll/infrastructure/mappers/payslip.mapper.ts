import { PayslipDomain } from 'src/payroll/domain/payslip';
import { Payslip } from '../entities/payslip.entity';

export class PayslipMapper {
    /**
     * **تبدیل `Entity` به `Domain`**
     */
    static toDomain(entity: Payslip): PayslipDomain {
        return new PayslipDomain(
            entity.id,
            entity.userId,
            entity.paymentDate,
            entity.date,
            entity.standardWorkDays,
            entity.netWorkDays,
            entity.absentMinutes,
            entity.overtimeMinutes,
            entity.leaveMinutes,
            entity.missionMinutes,
            entity.baseSalary,
            entity.seniorityPay,
            entity.overtimePay,
            entity.insuranceFee,
            entity.bonus,
            entity.totalAmount,
            entity.netPayable,
        );
    }

    /**
     * **تبدیل `Domain` به `Entity` برای ذخیره در دیتابیس**
     */
    static toEntity(domain: PayslipDomain): Payslip {
        const entity = new Payslip();
        entity.id = domain.id;
        entity.userId = domain.userId;
        entity.paymentDate = domain.paymentDate;
        entity.date = domain.date;
        entity.standardWorkDays = domain.standardWorkDays;
        entity.netWorkDays = domain.netWorkDays;
        entity.absentMinutes = domain.absentMinutes;
        entity.overtimeMinutes = domain.overtimeMinutes;
        entity.leaveMinutes = domain.leaveMinutes;
        entity.missionMinutes = domain.missionMinutes;
        entity.baseSalary = domain.baseSalary;
        entity.seniorityPay = domain.seniorityPay;
        entity.overtimePay = domain.overtimePay;
        entity.insuranceFee = domain.insuranceFee;
        entity.bonus = domain.bonus;
        entity.totalAmount = domain.totalAmount;
        entity.netPayable = domain.netPayable;

        return entity;
    }
}
