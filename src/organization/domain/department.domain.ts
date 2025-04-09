export class Department {
    constructor(
        public readonly id: number,
        public readonly organizationId: number,
        public readonly title: string,
        public readonly description: string | null,
        public readonly supervisorId: number | null,
        public readonly teams: any[] = [] // Optional: می‌تونی اینو بعداً تایپ بهتر بدی
    ) { }
}