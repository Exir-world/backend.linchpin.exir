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

    static nowUTC(): Date {
        return DateTime.utc().toJSDate();
    }

    static nowWithTimezone(timeZone: string = 'Asia/Tehran'): Date {
        return DateTime.utc().setZone(timeZone).toJSDate();
    }

    static checkOutChecking(checkOutTimes: { hour: number; minutes: number; }): boolean {
        const tehranNow = this.nowWithTimezone();
        const hour = tehranNow.getHours();
        const minute = tehranNow.getMinutes();

        return checkOutTimes.hour == hour && checkOutTimes.minutes == minute;
    }

    static convertTimeToUTC(timeString: string, zone: string = 'Asia/Tehran'): Date {
        const dateTime = DateTime.fromFormat(timeString, 'HH:mm:ss', { zone });
        return dateTime.toUTC().toJSDate();
    }

    static addMinutes(date: Date, minutes: number, timeZone: string = 'Asia/Tehran'): Date {
        if (!date) return null;

        const newDate = new Date(date.getTime() + minutes * 60 * 1000);

        return DateTime.fromJSDate(newDate).setZone(timeZone).toJSDate();;
    }

    static setTimezone(date: Date, timeZone: string = 'Asia/Tehran'): Date {
        return DateTime.fromJSDate(date).setZone(timeZone).toJSDate();
    }

    /**
     * دریافت ابتدای روز برای یک منطقه زمانی
     * @param timeZone - منطقه زمانی (مثلاً 'Asia/Tehran')
     */
    static startOfDay(timeZone: string = 'Asia/Tehran'): Date {
        return DateTime.utc().setZone(timeZone).startOf('day').toJSDate();;
    }

    /**
     * دریافت انتهای روز برای یک منطقه زمانی (آغاز روز بعد)
     * @param timeZone - منطقه زمانی (مثلاً 'Asia/Tehran')
     */
    static endOfDay(timeZone: string = 'Asia/Tehran'): Date {
        return DateTime.utc().setZone(timeZone).endOf('day').toJSDate();
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
    static getStartOfCurrentJalaliMonth(timeZone: string = 'Asia/Tehran'): Date {
        // دریافت تاریخ شمسی جاری
        const currentDate = new persianDate();

        // تغییر روز به اول ماه
        const startOfMonth = currentDate.startOf('month');

        // تبدیل به تاریخ میلادی
        const gregorianDate = startOfMonth.toDate();

        // تبدیل به UTC
        return gregorianDate.setZone(timeZone).toJSDate();
    }

    static dateDifferenceInMinutes(firstDate: any, secondDate: any) {
        const diffInMs = Math.abs(new Date(secondDate).getTime() - new Date(firstDate).getTime());
        return diffInMs / (1000 * 60);
    }

    static dateDifferenceInDays(firstDate: any, secondDate: any) {
        const diffInMs = Math.abs(new Date(secondDate).getTime() - new Date(firstDate).getTime());
        return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    }

    // static startOfCurrentTime(timeZone: string = 'Asia/Tehran'): Date {
    //     const current = DateTime.utc().setZone(timeZone).toJSDate();
    //     current.setMinutes(0);
    //     current.setSeconds(0);
    //     current.setMilliseconds(0);
    //     return current;
    // }

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

    static formatDateToTehran(date: string, format: 'HH:mm' | 'HH:mm:ss' | 'YYYY-MM-DD', timezone: string = 'Asia/Tehran'): string {
        if (!date)
            return null;

        let dateTime: DateTime;

        // Check if date is in ISO format
        if (date.includes('T')) {
            dateTime = DateTime.fromISO(date);
        } else {
            dateTime = DateTime.fromSQL(date);
        }


        // مرحله ۲: تغییر تایم‌زون به تهران
        const tehranDateTime = dateTime.setZone(timezone);

        // مرحله ۳: فرمت‌دهی براساس ورودی کاربر
        switch (format) {
            case 'HH:mm':
                return tehranDateTime.toFormat('HH:mm');
            case 'HH:mm:ss':
                return tehranDateTime.toFormat('HH:mm:ss');
            case 'YYYY-MM-DD':
                return tehranDateTime.toFormat('yyyy-MM-dd');
            default:
                throw new Error('Invalid format. Supported formats: HH:mm, HH:mm:ss, YYYY-MM-DD');
        }
    }

    /**
 * Converts minutes into a formatted string (HH:mm or mm)
 * @param minutes - Number of minutes to convert
 * @returns Formatted string in HH:mm or mm
 */
    static formatMinutesToTime(minutes: number): string {
        minutes = Math.floor(minutes);

        if (minutes < 0) {
            throw new Error('Minutes cannot be negative');
        }

        const hours = Math.floor(minutes / 60); // Calculate hours
        const remainingMinutes = minutes % 60; // Get remaining minutes

        return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`; // HH:mm
    }

    /**
     * دریافت سال فعلی شمسی
     * @returns سال فعلی شمسی
     */
    static getCurrentJalaliYear(): number {
        const currentDate = new persianDate();
        return currentDate.year();
    }

    static parseTime(timeString: string, zone = "Asia/Tehran"): string {
        const parsedTime = DateTime.fromFormat(timeString, "HH:mm:ss").setZone(zone).toFormat("HH:mm:ss");
        return parsedTime
    }

    static nowTime(zone = "Asia/Tehran"): string {
        const parsedTime = DateTime.utc().setZone(zone).toFormat("HH:mm:ss");
        return parsedTime
    }

    static getTimeDifference(startTime: string, endTime: string): number {
        const format = "HH:mm:ss";
        const start = DateTime.fromFormat(startTime, format);
        const end = DateTime.fromFormat(endTime, format);

        let diffInMinutes = end.diff(start, "minutes").minutes;
        // if (diffInMinutes < 0) diffInMinutes += 24 * 60;

        return Math.abs(diffInMinutes);
    }

}
