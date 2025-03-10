import * as ExcelJS from 'exceljs';
import { Response } from 'express';

export async function generateExcel(res: Response, data: any[]): Promise<void> {
    // 1. ایجاد یک ورک‌بوک جدید
    const workbook = new ExcelJS.Workbook();

    for (let i = 0; i < data.length; i++) {
        const user = data[i];

        // ایجاد شیت با نام کاربر
        const worksheet = workbook.addWorksheet(user.lastname);

        // 🟢 1. تیتر جدول اول (اطلاعات کاربر)
        worksheet.getCell('A1').value = 'اطلاعات کاربر';
        worksheet.getCell('A1').font = { bold: true, size: 14 };
        worksheet.getCell('A1').alignment = { horizontal: 'center' };
        worksheet.mergeCells('A1:C1');

        // 🟢 2. هدرهای جدول اول
        worksheet.addRow(['نام کاربر', 'نام مستعار', 'شماره همراه']).font = { bold: true };

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
        worksheet.getRow(gapRow + 1).values = ['تاریخ و روز', 'تردد ها', 'کارکرد', 'اولین ورود', 'آخرین خروج'];
        worksheet.getRow(gapRow + 1).font = { bold: true };

        // 🟢 6. اضافه کردن داده‌های تردد
        user.att.forEach(d => {
            worksheet.addRow([d.shamsiDate, d.attendances, d.workTime, d.firstCheckIn, d.lastCheckOut]);
        });

        worksheet.columns.forEach(column => {
            column.width = 25; // مقدار عرض ثابت برای تمام ستون‌ها
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