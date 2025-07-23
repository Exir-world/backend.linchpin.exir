# مستندات فنی پروژه Linchpin Backend

---

## معرفی پروژه

این پروژه یک سامانه مدیریت منابع انسانی و سازمانی است که امکاناتی مانند حضور و غیاب، مرخصی، مدیریت درخواست‌ها، مدیریت اموال، بهبود فردی، شیفت‌بندی، حقوق و دستمزد، اعلان‌ها و ... را برای سازمان‌ها فراهم می‌کند. معماری پروژه مبتنی بر NestJS و CQRS است و از PostgreSQL به عنوان دیتابیس استفاده می‌کند.

---

## ماژول‌ها و کاربرد هرکدام

در این بخش، هر ماژول به صورت خلاصه معرفی می‌شود:

- **auth**: مدیریت احراز هویت، نقش‌ها و کاربران، ورود/خروج، توکن JWT و سطوح دسترسی.
- **attendance**: مدیریت حضور و غیاب کاربران، ثبت ورود/خروج، گزارش کار روزانه و توقف‌ها.
- **leave**: مدیریت مرخصی‌های روزانه و ساعتی کاربران و ثبت درخواست مرخصی.
- **payroll**: محاسبه حقوق و دستمزد، تولید فیش حقوقی و گزارشات مالی.
- **organization**: مدیریت سازمان، تیم‌ها، دپارتمان‌ها و بهبود فردی سازمانی.
- **tasks**: مدیریت وظایف، زیرکارها، برچسب‌ها و اولویت‌بندی وظایف.
- **check-points**: تعریف نقاط کنترل (مثلاً برای حضور فیزیکی در محل خاص).
- **user-check-points**: ثبت حضور کاربران در نقاط کنترل و مدیریت پیوست‌ها.
- **improvement-parameters**: مدیریت پارامترهای بهبود فردی و ارزیابی کاربران.
- **user-self-improvement**: ثبت و ارزیابی بهبود فردی کاربران.
- **notifications**: ارسال و مدیریت اعلان‌ها (نوتیفیکیشن) به کاربران.
- **requests**: مدیریت انواع درخواست‌ها (مانند مرخصی، ورود/خروج دستی، درخواست اموال و ...).
- **properties**: مدیریت اموال سازمان، دسته‌بندی، ویژگی‌ها و تخصیص به کاربران.
- **user-employment-settings**: تنظیمات شغلی کاربران (شیفت، تیم، حقوق و ...).
- **user-times**: ثبت و مدیریت زمان‌بندی هفتگی کاربران.
- **shifts**: تعریف و مدیریت شیفت‌های کاری و زمان‌بندی آن‌ها.
- **shared-user**: سرویس‌های اشتراکی برای دریافت اطلاعات کاربران.
- **shared-notification**: سرویس‌های اشتراکی برای ارسال اعلان به کاربران/ادمین‌ها.
- **common/config/i18n**: تنظیمات عمومی، چندزبانه و ابزارهای کمکی.

---

## راه‌اندازی و اجرای پروژه

۱. نصب وابستگی‌ها:
```bash
npm install
```

۲. تنظیم متغیرهای محیطی (فایل `.env`):
- نمونه متغیرها:
  ```
  DATABASE_HOST=localhost
  DATABASE_PORT=5432
  DATABASE_USERNAME=postgres
  DATABASE_PASSWORD=yourpassword
  DATABASE_NAME=linchpin
  JWT_SECRET=your_jwt_secret
  REFRESH_SECRET=your_refresh_secret
  FALLBACK_LANGUAGE=fa
  ```

۳. اجرای پروژه:
```bash
npm run start:dev
```
یا برای build و اجرای production:
```bash
npm run build
npm run start:prod
```

۴. مستندات Swagger پس از اجرا در مسیر `/api/docs` در دسترس است.

---

## APIهای هر ماژول (نمونه و کاربرد)

### Auth (احراز هویت)
- `POST /api/auth/login` : ورود کاربر
- `POST /api/auth/refresh` : دریافت توکن جدید
- `POST /api/auth/login/admin` : ورود ادمین
- `POST /api/auth/register` : ثبت‌نام کاربر جدید
- `GET /api/auth/users` : دریافت لیست کاربران (ادمین)
- `POST /api/auth/roles` : ایجاد نقش جدید

### Attendance (حضور و غیاب)
- `POST /api/attendance/main-page` : ثبت ورود/خروج/توقف
- `GET /api/attendance/report` : دریافت گزارش حضور
- `POST /api/attendance/submit-work-report` : ثبت گزارش کار روزانه

### Leave (مرخصی)
- `POST /api/leave/create` : ثبت مرخصی
- `GET /api/leave/user` : لیست مرخصی‌های کاربر
- `GET /api/leave/hourly/user/:userId` : لیست مرخصی‌های ساعتی کاربر

### Payroll (حقوق و دستمزد)
- `GET /api/payroll/payslip` : دریافت فیش حقوقی کاربر
- `GET /api/payroll/calculate?startDate=...&endDate=...` : محاسبه حقوق کاربران در بازه زمانی

### Organization (سازمان)
- `POST /api/organization` : ایجاد سازمان جدید
- `GET /api/organization/:id` : دریافت اطلاعات سازمان
- `POST /api/organization/team` : ایجاد تیم جدید

### Tasks (وظایف)
- `POST /api/tasks` : ایجاد وظیفه جدید
- `GET /api/tasks` : لیست وظایف
- `POST /api/tasks/:id/approve` : تایید وظیفه توسط ایجادکننده

### CheckPoints (نقاط کنترل)
- `POST /api/check-points` : ایجاد نقطه کنترل
- `GET /api/check-points` : لیست نقاط کنترل

### UserCheckPoints (ثبت حضور در نقاط کنترل)
- `POST /api/user-check-points` : ثبت حضور کاربر در نقطه کنترل
- `GET /api/user-check-points/user` : لیست حضورهای کاربر

### Improvement Parameters (پارامترهای بهبود فردی)
- `POST /api/improvement-parameters` : ایجاد پارامتر جدید
- `GET /api/improvement-parameters/root` : لیست پارامترهای اصلی

### UserSelfImprovement (بهبود فردی کاربر)
- `POST /api/user-self-improvement` : ثبت ارزیابی بهبود فردی
- `GET /api/user-self-improvement` : دریافت ارزیابی‌های کاربر

### Notifications (اعلان‌ها)
- `POST /api/notifications/send` : ارسال اعلان
- `GET /api/notifications` : لیست اعلان‌های کاربر

### Requests (درخواست‌ها)
- `POST /api/requests/create` : ایجاد درخواست جدید
- `POST /api/requests/review` : تایید/رد درخواست
- `GET /api/requests/request-types` : لیست انواع درخواست

### Properties (اموال)
- `POST /api/properties` : ایجاد مال جدید
- `GET /api/properties` : لیست اموال
- `POST /api/property-user/assign` : تخصیص مال به کاربر

### UserEmploymentSettings (تنظیمات شغلی کاربر)
- `POST /api/user-employment-settings` : ایجاد تنظیمات شغلی
- `GET /api/user-employment-settings/:userId` : دریافت تنظیمات کاربر

### UserTimes (زمان‌بندی هفتگی)
- `POST /api/user-times` : ثبت زمان‌بندی هفتگی
- `GET /api/user-times/latest/:userId` : دریافت آخرین زمان‌بندی کاربر

### Shifts (شیفت‌ها)
- `POST /api/shifts` : ایجاد شیفت جدید
- `GET /api/shifts/organization/:organizationId` : لیست شیفت‌های سازمان

---

## ساختار دیتابیس و موجودیت‌ها

# جداول موجودیت‌های دیتابیس به تفکیک ماژول

## ماژول Attendance (حضور و غیاب)

### جدول attendance
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه رکورد                   |
| userId           | number      | شناسه کاربر                   |
| checkIn          | Date        | زمان ورود                     |
| checkOut         | Date        | زمان خروج                     |
| lat              | number      | موقعیت جغرافیایی (عرض)        |
| lng              | number      | موقعیت جغرافیایی (طول)        |
| workReport       | WorkReport  | ارتباط با گزارش کار           |
| stops            | Stop[]      | لیست توقف‌ها                  |

### جدول work_report
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه گزارش                   |
| attendance       | Attendance  | ارتباط با حضور                |
| workReport       | string      | متن گزارش کار                 |
| accepted         | boolean     | تایید توسط سوپروایزر          |
| comment          | string      | نظر سوپروایزر                 |
| acceptedBy       | number      | شناسه تاییدکننده              |

### جدول stops
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه توقف                    |
| attendance       | Attendance  | ارتباط با حضور                |
| reason           | string      | دلیل توقف                     |
| startTime        | Date        | زمان شروع توقف                |
| endTime          | Date        | زمان پایان توقف               |

---

## ماژول Auth (احراز هویت)

### جدول roles
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه نقش                     |
| name             | string      | نام نقش                       |
| description      | string      | توضیحات نقش                   |
| permissions      | Permission[]| لیست دسترسی‌ها                |
| createdAt        | Date        | تاریخ ایجاد                   |

### جدول users
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه کاربر                   |
| organizationId   | number      | شناسه سازمان                  |
| name             | string      | نام کاربری                    |
| profileImage     | string      | تصویر پروفایل                 |
| firstname        | string      | نام                            |
| lastname         | string      | نام خانوادگی                  |
| phoneNumber      | string      | شماره موبایل                  |
| password         | string      | رمز عبور                       |
| role             | Role        | نقش کاربر                     |
| nationalCode     | string      | کد ملی                        |
| personnelCode    | string      | کد پرسنلی                     |
| isDeleted        | boolean     | حذف شده؟                      |
| hasAdminPanelAccess | boolean   | دسترسی به پنل ادمین           |

### جدول user_sessions
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه نشست                    |
| refreshToken     | string      | توکن رفرش                     |
| jwtExpires       | number      | زمان انقضای JWT               |
| user             | User        | کاربر                         |
| isActive         | boolean     | فعال؟                         |
| firebaseToken    | string      | توکن FCM                      |

---

## ماژول CheckPoints (نقاط کنترل)

### جدول check_points
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه نقطه کنترل              |
| organizationId   | number      | شناسه سازمان                  |
| title            | string      | عنوان نقطه                    |
| createdAt        | Date        | تاریخ ایجاد                   |
| isActive         | boolean     | فعال؟                         |
| items            | CheckPointItem[] | آیتم‌های نقطه کنترل         |

### جدول check_point_items
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه آیتم                    |
| lat              | number      | عرض جغرافیایی                 |
| lng              | number      | طول جغرافیایی                 |
| radius           | number      | شعاع (متر)                    |
| needReport       | boolean     | نیاز به گزارش؟                |
| checkPoint       | CheckPoint  | نقطه کنترل والد               |
| checkPointId     | number      | شناسه نقطه کنترل              |

---

## ماژول Leave (مرخصی)

### جدول leave
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه مرخصی                   |
| type             | LeaveType   | نوع مرخصی                     |
| userId           | number      | شناسه کاربر                   |
| description      | string      | توضیحات                       |
| startTime        | Date        | زمان شروع                     |
| endTime          | Date        | زمان پایان                    |
| createdAt        | Date        | تاریخ ایجاد                   |

---

## ماژول Notifications (اعلان‌ها)

### جدول notifications
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه اعلان                   |
| userId           | number      | شناسه کاربر                   |
| type             | NotificationType | نوع اعلان                   |
| title            | string      | عنوان اعلان                   |
| description      | string      | متن اعلان                     |
| read             | boolean     | خوانده شده؟                   |
| createdAt        | Date        | تاریخ ایجاد                   |

---

## ماژول Organization (سازمان)

### جدول organization
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه سازمان                   |
| creatorId        | number      | شناسه سازنده                   |
| name             | string      | نام سازمان                     |
| address          | string      | آدرس                           |
| description      | string      | توضیحات                        |

### جدول departments
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه دپارتمان                 |
| organizationId   | number      | شناسه سازمان                   |
| supervisorId     | number      | شناسه سرپرست                   |
| title            | string      | عنوان دپارتمان                 |
| description      | string      | توضیحات                        |

### جدول teams
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه تیم                      |
| departmentId     | number      | شناسه دپارتمان                 |
| supervisorId     | number      | شناسه سرپرست                   |
| title            | string      | عنوان تیم                      |
| color            | string      | رنگ                            |
| description      | string      | توضیحات                        |

### جدول self-improvement
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه                          |
| organizationId   | number      | شناسه سازمان                   |
| title            | string      | عنوان                          |
| isDefault        | boolean     | پیش‌فرض؟                       |
| description      | string      | توضیحات                        |

### جدول self-improvement-item
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه آیتم                     |
| title            | string      | عنوان آیتم                     |
| type             | enum        | نوع آیتم                       |
| image            | string      | تصویر                          |
| color            | string      | رنگ                            |
| selfImprovement  | SelfImprovement | والد                        |

### جدول self-improvement-subitem
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه زیرآیتم                  |
| title            | string      | عنوان زیرآیتم                  |
| score            | number[]    | امتیازها                       |
| selfImprovementItem | SelfImprovementItem | والد                  |

### جدول location
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه                          |
| organizationId   | number      | شناسه سازمان                   |
| lat              | number      | عرض جغرافیایی                  |
| lng              | number      | طول جغرافیایی                  |
| radius           | number      | شعاع (متر)                     |
| createdAt        | Date        | تاریخ ایجاد                    |
| updatedAt        | Date        | تاریخ بروزرسانی                |

---

## ماژول Improvement Parameters (پارامترهای بهبود)

### جدول improvement_parameters
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه پارامتر                  |
| title            | string      | عنوان پارامتر                  |
| type             | enum        | نوع پارامتر                    |
| image            | string      | تصویر                          |
| color            | string      | رنگ                            |
| score            | number[]    | امتیازها                       |
| parent           | ImprovementParameter | والد (درختی)           |

### جدول user_improvement_parameters
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه                          |
| userId           | number      | شناسه کاربر                    |
| improvementParameter | ImprovementParameter | پارامتر بهبود         |
| userScore        | number      | امتیاز کاربر                   |
| supervisorScore  | number      | امتیاز سرپرست                  |
| date             | Date        | تاریخ                          |
| description      | string      | توضیحات                        |

---

## ماژول Properties (اموال)

### جدول properties
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه مال                      |
| code             | string      | کد یکتا                        |
| category         | PropertyCategory | دسته‌بندی                   |
| brand            | string      | برند                           |
| model            | string      | مدل                            |
| description      | string      | توضیحات                        |
| status           | enum        | وضعیت                          |
| createdAt        | Date        | تاریخ ایجاد                    |
| organizationId   | number      | شناسه سازمان                   |
| departmentId     | number      | شناسه دپارتمان                 |
| imageUrl         | string      | تصویر                          |

### جدول property_reports
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه گزارش                    |
| userId           | number      | شناسه کاربر                    |
| property         | Property    | مال                            |
| propertyId       | number      | شناسه مال                      |
| report           | string      | متن گزارش                      |
| status           | enum        | وضعیت گزارش                    |
| createdAt        | Date        | تاریخ ایجاد                    |

### جدول property_category_features
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه ویژگی                    |
| title            | string      | عنوان ویژگی                    |
| category         | PropertyCategory | دسته‌بندی                   |

### جدول property_categories
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه دسته‌بندی                |
| title            | string      | عنوان دسته‌بندی                |

### جدول property_features
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه ویژگی                    |
| value            | string      | مقدار ویژگی                    |
| property         | Property    | مال                            |
| feature          | PropertyCategoryFeature | ویژگی دسته‌بندی        |

### جدول user_properties
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه                          |
| userId           | number      | شناسه کاربر                    |
| property         | Property    | مال                            |
| propertyId       | number      | شناسه مال                      |
| deliveredAt      | Date        | تاریخ تحویل                    |

---

## ماژول Requests (درخواست‌ها)

### جدول requests
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه درخواست                  |
| type             | enum        | نوع درخواست                    |
| status           | enum        | وضعیت درخواست                  |
| description      | string      | توضیحات                        |
| adminComment     | string      | نظر ادمین                      |
| userId           | number      | شناسه کاربر                    |
| startTime        | Date        | زمان شروع                      |
| endTime          | Date        | زمان پایان                     |
| reviewedBy       | number      | شناسه بررسی‌کننده              |
| reviewedAt       | Date        | زمان بررسی                     |
| createdAt        | Date        | تاریخ ایجاد                    |
| updatedAt        | Date        | تاریخ بروزرسانی                |

---

## ماژول Tasks (وظایف)

### جدول task
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه وظیفه                    |
| title            | string      | عنوان وظیفه                    |
| description      | string      | توضیحات                        |
| priority         | Priority    | اولویت                         |
| estimatedDuration| number      | مدت زمان تخمینی                |
| date             | Date        | تاریخ                          |
| userId           | number      | شناسه مسئول                     |
| createdBy        | number      | شناسه ایجادکننده               |
| creatorApprove   | boolean     | تایید ایجادکننده                |
| creatorComment   | string      | نظر ایجادکننده                  |
| createdAt        | Date        | تاریخ ایجاد                    |
| subTasks         | Subtask[]   | زیرکارها                        |
| attachments      | Attachment[]| پیوست‌ها                        |
| taskTags         | TaskTag[]   | برچسب‌ها                        |

### جدول tag
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه برچسب                    |
| title            | string      | عنوان برچسب                    |
| color            | string      | رنگ                            |
| textColor        | string      | رنگ متن                        |
| icon             | string      | آیکون                          |

### جدول task_tag
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه                          |
| task             | Task        | وظیفه                          |
| tag              | Tag         | برچسب                          |

### جدول sub_task
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه                          |
| title            | string      | عنوان زیرکار                   |
| task             | Task        | وظیفه والد                     |
| done             | boolean     | انجام شده؟                     |

### جدول priority
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه اولویت                   |
| title            | string      | عنوان اولویت                   |
| priority         | number      | مقدار اولویت                   |
| color            | string      | رنگ                            |

### جدول attachment
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه                          |
| task             | Task        | وظیفه والد                     |
| fileType         | enum        | نوع فایل                       |
| fileName         | string      | نام فایل                       |
| createdAt        | Date        | تاریخ ایجاد                    |
| fileSize         | number      | اندازه فایل                    |
| link             | string      | لینک فایل                      |

---

## ماژول User Check Points (ثبت نقاط کنترل کاربر)

### جدول user_check_points
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه                          |
| userId           | number      | شناسه کاربر                    |
| lat              | number      | عرض جغرافیایی                  |
| lng              | number      | طول جغرافیایی                  |
| report           | string      | گزارش                          |
| createdAt        | Date        | تاریخ ثبت                      |
| checkPointItemId | number      | شناسه آیتم نقطه کنترل          |
| attachments      | UserCheckPointAttachment[] | پیوست‌ها           |

### جدول user_checkpoint_assign
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه                          |
| userId           | number      | شناسه کاربر                    |
| checkpointId     | number      | شناسه نقطه کنترل               |
| startDate        | Date        | تاریخ شروع                     |
| endDate          | Date        | تاریخ پایان                    |

### جدول user_check_point_attachments
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه                          |
| filename         | string      | نام فایل                       |
| fileType         | string      | نوع فایل                       |
| fileUrl          | string      | آدرس فایل                      |
| description      | string      | توضیحات                        |
| createdAt        | Date        | تاریخ ایجاد                    |
| userCheckPoint   | UserCheckPoint | رکورد والد                  |
| userCheckPointId | number      | شناسه رکورد والد               |

---

## ماژول User Employment Settings (تنظیمات شغلی کاربر)

### جدول user_employment_settings
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه                          |
| userId           | number      | شناسه کاربر                    |
| teamId           | number      | شناسه تیم                      |
| salary           | number      | حقوق                           |
| shiftId          | number      | شناسه شیفت                     |
| needLocation     | boolean     | نیاز به حضور مکانی             |
| deviceUniqueCode | string      | کد یکتای دستگاه                 |

---

## ماژول User Self Improvement (بهبود فردی کاربر)

### جدول user-self-improvement
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه                          |
| userId           | number      | شناسه کاربر                    |
| improvementId    | number      | شناسه بهبود                    |
| userScore        | number      | امتیاز کاربر                   |
| supervisorScore  | number      | امتیاز سرپرست                  |
| date             | Date        | تاریخ                          |
| description      | string      | توضیحات                        |

---

## ماژول User Times (زمان‌بندی کاربر)

### جدول user_times
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه                          |
| userId           | number      | شناسه کاربر                    |
| createdAt        | Date        | تاریخ ایجاد                    |
| weeklyTimes      | WeeklyTimes[] | زمان‌بندی هفتگی               |

### جدول weekly_times
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه                          |
| userTimes        | UserTimes   | رکورد والد                    |
| dayOfWeek        | number      | روز هفته (۰ تا ۶)              |
| startTime        | string      | زمان شروع                      |
| endTime          | string      | زمان پایان                     |
| isAbsent         | boolean     | غیبت؟                          |

---

## ماژول Shifts (شیفت‌ها)

### جدول shifts
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه                          |
| organizationId   | number      | شناسه سازمان                   |
| title            | string      | عنوان شیفت                     |
| shiftTimes       | ShiftTime[] | زمان‌بندی شیفت                 |

### جدول shift_times
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه                          |
| shift            | Shift       | شیفت والد                      |
| startTime        | string      | زمان شروع                      |
| endTime          | string      | زمان پایان                     |
| type             | enum        | نوع بازه (کار، استراحت و ...)  |

---

## ماژول Payroll (حقوق و دستمزد)

### جدول payslips
| نام فیلد         | نوع         | توضیحات                       |
|------------------|-------------|-------------------------------|
| id               | number      | شناسه                          |
| userId           | number      | شناسه کاربر                    |
| date             | Date        | تاریخ فیش                      |
| paymentDate      | Date        | تاریخ واریز                     |
| standardWorkDays | number      | کارکرد استاندارد                |
| netWorkDays      | number      | کارکرد خالص                     |
| absentMinutes    | number      | کسری کار به دقیقه               |
| overtimeMinutes  | number      | اضافه کار به دقیقه              |
| leaveMinutes     | number      | مرخصی به دقیقه                  |
| missionMinutes   | number      | ماموریت به دقیقه                |
| baseSalary       | number      | حقوق پایه                       |
| seniorityPay     | number      | پایه سنوات                      |
| overtimePay      | number      | اضافه کار                       |
| insuranceFee     | number      | حق بیمه                         |
| bonus            | number      | عیدی                            |
| totalAmount      | number      | جمع کل                          |
| netPayable       | number      | خالص دریافتی                    |

---

### نکات تکمیلی

- پروژه از معماری ماژولار و CQRS استفاده می‌کند.
- احراز هویت مبتنی بر JWT است.
- مستندات کامل API در Swagger موجود است.
- برای هر ماژول، کنترلرها و سرویس‌های جداگانه وجود دارد.
- دیتابیس به صورت اتوماتیک با TypeORM سینک می‌شود (در حالت توسعه).

---