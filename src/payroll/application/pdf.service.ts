import { Injectable } from '@nestjs/common';
// import * as puppeteer from 'puppeteer';

@Injectable()
export class PdfService {
  //     async generatePayslipPdf(): Promise<Buffer> {
  //         const browser = await puppeteer.launch({ headless: true });
  //         const page = await browser.newPage();

  //         // HTML Template for the Payslip
  //         const htmlContent = `
  //       <html>
  //         <head>
  //           <style>
  //             body { font-family: Arial, sans-serif; padding: 20px; }
  //             table { width: 100%; border-collapse: collapse; }
  //             th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
  //             th { background-color: #f4f4f4; }
  //             .title { text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 20px; }
  //           </style>
  //         </head>
  //         <body>
  //           <div class="title">فیش حقوقی</div>
  //           <table>
  //             <tr><th>نام و نام خانوادگی</th><td>هادی وجدانی</td></tr>
  //             <tr><th>کد ملی</th><td>123456789</td></tr>
  //             <tr><th>حقوق پایه</th><td>74,050,658 ریال</td></tr>
  //             <tr><th>جمع کسورات</th><td>19,650,091 ریال</td></tr>
  //             <tr><th>خالص پرداختی</th><td>137,620,000 ریال</td></tr>
  //           </table>
  //         </body>
  //       </html>
  //     `;

  //         await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

  //         const pdfBuffer = Buffer.from(await page.pdf({
  //             format: 'A4',
  //             printBackground: true,
  //         }));


  //         await browser.close();
  //         return pdfBuffer;
  //     }
}
