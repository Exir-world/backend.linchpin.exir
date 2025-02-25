const EARTH_RADIUS = 6371000; // شعاع زمین به متر

export function isWithinRadius(
    lat: number,
    lng: number,
    referenceLat: number,
    referenceLng: number,
    radius: number
): boolean {
    // تبدیل درجات به رادیان
    const lat1 = toRadians(lat);
    const lng1 = toRadians(lng);
    const lat2 = toRadians(referenceLat);
    const lng2 = toRadians(referenceLng);

    // اختلاف طول و عرض جغرافیایی
    const dLat = lat2 - lat1;
    const dLng = lng2 - lng1;

    // فرمول هاروسین برای محاسبه فاصله بین دو نقطه روی کره زمین
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = EARTH_RADIUS * c; // فاصله به متر

    return distance <= radius;
}

// تابع تبدیل درجه به رادیان
function toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
}