import { SetMetadata } from '@nestjs/common';

/**
 * دکوریتور برای تعریف سیاست‌های دسترسی
 * @param policies - لیست سیاست‌ها یا شرایط دسترسی
 */
export const Policies = (...policies: string[]) => SetMetadata('policies', policies);
