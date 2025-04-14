import * as ExcelJS from 'exceljs';
import { Response } from 'express';

const salary = [
    { userId: 1, salary: 250000000 },
    { userId: 2, salary: 300000000 },
    { userId: 3, salary: 175000000 },
    { userId: 4, salary: 200000000 },
    { userId: 7, salary: 200000000 },
    { userId: 8, salary: 200000000 },
    { userId: 9, salary: 150000000 },
    { userId: 10, salary: 400000000 },
    { userId: 11, salary: 200000000 },
    { userId: 12, salary: 150000000 },
    { userId: 14, salary: 150000000 },
    { userId: 15, salary: 350000000 },
    { userId: 16, salary: 150000000 },
    { userId: 17, salary: 150000000 },
    { userId: 18, salary: 150000000 },
    { userId: 28, salary: 150000000 },
    { userId: 32, salary: 120000000 },
    { userId: 38, salary: 150000000 },
    { userId: 35, salary: 150000000 },
    { userId: 33, salary: 150000000 },
    { userId: 26, salary: 150000000 },
    { userId: 27, salary: 150000000 },
    { userId: 65, salary: 150000000 },
]

function sumTimes(timeStrings: string[]): string {
    let totalMinutes = 0;

    timeStrings.forEach(time => {
        const [hours, minutes] = time.split(':').map(Number);
        totalMinutes += hours * 60 + minutes;
    });

    // تبدیل مجموع دقیقه به HH:mm
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    return `${String(totalHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
}

export async function generateExcel(res: Response, data: any[], workDuration: number, holidaysDayCount: number): Promise<void> {
    // 1. ایجاد یک ورک‌بوک جدید
    const workbook = new ExcelJS.Workbook();

    const worksheet = workbook.addWorksheet('خلاصه کارکرد');
    worksheet.views = [{ rightToLeft: true }];
    worksheet.columns = [
        { header: 'نام کاربر', key: 'lastname', width: 25 },
        { header: 'مجموع کارکرد خالص', key: 'workTimesPure', width: 15 },
        { header: 'مجموع کارکرد', key: 'workTimes', width: 15 },
        { header: 'مجموع کارکرد (با کسر ناهار)', key: 'workTimesWithLunch', width: 20 },
        { header: 'تعداد روز های کارکرد', key: 'workDays', width: 15 },
        { header: 'تعداد روز های تعطیلی رسمی', key: 'holidaysDayCount', width: 20 },
        { header: 'پایه حقوق', key: 'salary', width: 20 },
        { header: 'حقوق دریافتی', key: 'paidSalary', width: 20 },
    ];

    // تنظیم استایل هدرها
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
        cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
        };
    });

    const h = workDuration * holidaysDayCount;
    const workHolidaysHours = Math.floor(h / 60);
    const workHolidaysMinutes = h % 60;
    const formattedHolidaysWorkTime = `${workHolidaysHours.toString().padStart(2, '0')}:${workHolidaysMinutes.toString().padStart(2, '0')}`;

    data.forEach(d => {
        const workTimesPureFormated = sumTimes([
            sumTimes(d.att.map(a => a.workTimeWithLunch)),
            formattedHolidaysWorkTime,
        ]);

        const workTimesPure = workTimesPureFormated.split(':').reduce((acc, time) => (60 * acc) + +time, 0);

        worksheet.addRow({
            lastname: d.lastname,
            workTimes: sumTimes(d.att.map(a => a.workTime)),
            workTimesWithLunch: sumTimes(d.att.map(a => a.workTimeWithLunch)),
            workDays: d.att.filter(a => a.workTime != '00:00').length,
            holidaysDayCount,
            workTimesPure: workTimesPureFormated,
            salary: salary.find(s => s.userId == d.userId)?.salary
                ? salary.find(s => s.userId == d.userId)?.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '-',
            paidSalary: salary.find(s => s.userId == d.userId)?.salary
                ? Math.floor((workTimesPure / (440 * 26)) * salary.find(s => s.userId == d.userId)?.salary)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : '-',
        });
    })

    // تنظیم ارتفاع ردیف‌ها و تراز کردن سلول‌ها
    worksheet.eachRow((row, rowNumber) => {
        row.height = 20; // تنظیم ارتفاع ردیف
        row.eachCell((cell, colNumber) => {
            cell.alignment = { horizontal: 'center', vertical: 'middle' }; // تراز کردن سلول‌ها
        });
    });

    for (let i = 0; i < data.length; i++) {
        const user = data[i];

        // ایجاد شیت با نام کاربر
        const worksheet = workbook.addWorksheet(user.lastname);
        worksheet.views = [{ rightToLeft: true }];

        // 🟢 1. تیتر جدول اول (اطلاعات کاربر)
        worksheet.getCell('A1').value = 'اطلاعات کاربر';
        worksheet.getCell('A1').font = { bold: true, size: 14 };
        worksheet.getCell('A1').alignment = { horizontal: 'center' };
        worksheet.mergeCells('A1:C1');

        // 🟢 2. هدرهای جدول اول
        const headerRow = worksheet.addRow(['نام کاربر', 'نام مستعار', 'شماره همراه']);
        headerRow.font = { bold: true };
        headerRow.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
        });

        // 🟢 3. اضافه کردن داده‌های جدول اول
        worksheet.addRow([user.lastname, user.name, user.phoneNumber]);

        // فاصله بین جداول
        const gapRow = worksheet.lastRow.number + 2;

        // 🟢 4. تیتر جدول دوم (اطلاعات تردد)
        worksheet.getCell(`A${gapRow}`).value = 'گزارش تردد';
        worksheet.getCell(`A${gapRow}`).font = { bold: true, size: 14 };
        worksheet.getCell(`A${gapRow}`).alignment = { horizontal: 'center' };
        worksheet.mergeCells(`A${gapRow}:E${gapRow}`);

        // 🟢 5. هدرهای جدول دوم
        const attendanceHeaderRow = worksheet.getRow(gapRow + 1);
        attendanceHeaderRow.values = ['تاریخ و روز', 'تردد ها', 'کارکرد', 'اولین ورود', 'آخرین خروج'];
        attendanceHeaderRow.font = { bold: true };
        attendanceHeaderRow.eachCell((cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
        });

        // 🟢 6. اضافه کردن داده‌های تردد
        user.att.forEach(d => {
            worksheet.addRow([d.shamsiDate, d.attendances, d.workTime, d.firstCheckIn, d.lastCheckOut]);
        });

        const sumOfWorkTimes = sumTimes(user.att.map(d => d.workTime));

        worksheet.addRow(['', '', `+ ${sumOfWorkTimes}`, '', '']);


        worksheet.columns.forEach(column => {
            column.width = 25; // مقدار عرض ثابت برای تمام ستون‌ها
        });

        // تنظیم ارتفاع ردیف‌ها و تراز کردن سلول‌ها
        worksheet.eachRow((row, rowNumber) => {
            row.height = 20; // تنظیم ارتفاع ردیف
            row.eachCell((cell, colNumber) => {
                cell.alignment = { horizontal: 'center', vertical: 'middle' }; // تراز کردن سلول‌ها
            });
        });
    }

    // worksheet.eachRow((row, rowNumber) => {
    //     row.eachCell((cell, colNumber) => {
    //         cell.alignment = { horizontal: 'center' };
    //     });
    // });

    // 5. تنظیم نوع پاسخ برای دانلود فایل
    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
        'Content-Disposition',
        'attachment; filename=users.xlsx',
    );

    // 6. نوشتن داده‌ها به استریم و ارسال فایل
    await workbook.xlsx.write(res);
    res.end();
}