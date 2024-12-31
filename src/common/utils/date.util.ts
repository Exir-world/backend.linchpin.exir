import { DateTime } from 'luxon';
import * as persianDate from 'persian-date';

export interface MonthStart {
    monthNumber: number; // شماره ماه شمسی (1-12)
    startDate: DateTime;   // تاریخ شروع ماه به میلادی (ISO String در تایم‌زون تهران)
}

export class DateUtil {
    /**
     * دریافت زمان فعلی به صورت UTC
     */
    static nowUTC(timeZone: string = 'Asia/Tehran'): DateTime {
        return DateTime.utc().setZone(timeZone);
    }

    static setTimezone(date: Date, timeZone: string = 'Asia/Tehran'): DateTime {
        return DateTime.fromJSDate(date).setZone(timeZone);
    }

    /**
     * دریافت ابتدای روز برای یک منطقه زمانی
     * @param timeZone - منطقه زمانی (مثلاً 'Asia/Tehran')
     */
    static startOfDay(timeZone: string = 'Asia/Tehran'): DateTime {
        return DateTime.utc().setZone(timeZone).startOf('day');
    }

    /**
     * دریافت انتهای روز برای یک منطقه زمانی (آغاز روز بعد)
     * @param timeZone - منطقه زمانی (مثلاً 'Asia/Tehran')
     */
    static endOfDay(timeZone: string = 'Asia/Tehran'): DateTime {
        return DateTime.utc().setZone(timeZone).endOf('day');
    }

    /**
 * تبدیل تاریخ میلادی به شمسی
 * @param isoDate - تاریخ میلادی به‌صورت ISO (e.g., '2024-12-24T08:48:50.610Z')
 * @returns تاریخ شمسی به‌صورت رشته
 */
    static convertToJalali(isoDate: string): string {
        const date = new persianDate(new Date(isoDate));
        return date.format('YYYY/MM/DD HH:mm:ss');
    }

    /**
     * دریافت ابتدای ماه شمسی جاری به‌صورت UTC
     * @returns تاریخ UTC به‌صورت ISO
     */
    static getStartOfCurrentJalaliMonth(timeZone: string = 'Asia/Tehran'): DateTime {
        // دریافت تاریخ شمسی جاری
        const currentDate = new persianDate();

        // تغییر روز به اول ماه
        const startOfMonth = currentDate.startOf('month');

        // تبدیل به تاریخ میلادی
        const gregorianDate = startOfMonth.toDate();

        // تبدیل به UTC
        return gregorianDate.setZone(timeZone);
    }

    static dateDifferenceInMinutes(firstDate: any, secondDate: any) {
        const diffInMs = Math.abs(new Date(secondDate).getTime() - new Date(firstDate).getTime());
        return diffInMs / (1000 * 60);
    }

    /**
   * دریافت تاریخ شروع یک ماه مشخص قبل از ماه فعلی
   * @param monthsAgo تعداد ماه‌هایی که باید به عقب برگردیم
   * @returns تاریخ شروع ماه هدف به‌صورت ISO string در تایم‌زون تهران
   */
    static getStartOfPreviousMonth(monthsAgo: number = 6): string {
        if (monthsAgo < 1) {
            throw new Error('تعداد ماه‌ها باید حداقل 1 باشد.');
        }

        // دریافت تاریخ شمسی فعلی
        let currentPersianDate = new persianDate();
        let currentYear = currentPersianDate.year();
        let currentMonth = currentPersianDate.month();

        // محاسبه ماه و سال هدف
        let targetMonth = currentMonth - monthsAgo + 1;
        while (targetMonth <= 0) {
            targetMonth += 12;
            currentYear -= 1;
        }

        // ساخت تاریخ شمسی هدف
        const targetPersianDate = new persianDate([currentYear, targetMonth, 1]);

        // تبدیل تاریخ شمسی به میلادی
        const targetGregorianDate = targetPersianDate.toLocale('en').toDate();

        // استفاده از luxon برای تایم‌زون تهران
        const dateInTehran = DateTime.fromJSDate(targetGregorianDate, { zone: 'Asia/Tehran' });

        return dateInTehran.toISO();
    }

    /**
   * دریافت تاریخ شروع ماه‌ها از ماه فعلی تا تعداد مشخصی از ماه‌های قبل
   * @param monthsAgo تعداد ماه‌هایی که باید به عقب برگردیم
   * @returns آرایه‌ای از تاریخ شروع ماه‌های شمسی به‌صورت میلادی و تایم‌زون تهران
   */
    static getStartOfPreviousMonths(monthsAgo: number = 6): MonthStart[] {
        if (monthsAgo < 1) {
            throw new Error('تعداد ماه‌ها باید حداقل 1 باشد.');
        }

        const months: MonthStart[] = [];
        let currentPersianDate = new persianDate();
        let currentYear = currentPersianDate.year();
        let currentMonth = currentPersianDate.month();

        for (let i = 0; i < monthsAgo; i++) {
            // محاسبه ماه و سال هدف
            let targetMonth = currentMonth - i;
            let targetYear = currentYear;

            while (targetMonth <= 0) {
                targetMonth += 12;
                targetYear -= 1;
            }

            // ساخت تاریخ شمسی هدف
            const targetPersianDate = new persianDate([targetYear, targetMonth, 1]);

            // تبدیل تاریخ شمسی به میلادی
            const targetGregorianDate = targetPersianDate.toLocale('en').toDate();

            // استفاده از luxon برای تایم‌زون تهران
            const dateInTehran = DateTime.fromJSDate(targetGregorianDate, { zone: 'Asia/Tehran' });

            months.push({
                monthNumber: targetMonth,
                startDate: dateInTehran,
            });
        }

        return months;
    }

    static fromJsDate(date: Date) {
        return DateTime.fromJSDate(date);
    }
}
