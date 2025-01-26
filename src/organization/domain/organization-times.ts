export class OrganizationTimes {
    private id: number;
    private organizationId: number;
    private startTime: string;
    private endTime: string;
    private isWorkTime: boolean;
    private description: string | null;

    constructor(
        id: number,
        organizationId: number,
        startTime: string,
        endTime: string,
        isWorkTime: boolean = true,
        description: string | null = null
    ) {
        this.id = id;
        this.organizationId = organizationId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isWorkTime = isWorkTime;
        this.description = description;
    }

    public get getId(): number {
        return this.id;
    }

    public get getOrganizationId(): number {
        return this.organizationId;
    }

    public get getStartTime(): string {
        return this.startTime;
    }

    public get getEndTime(): string {
        return this.endTime;
    }

    public get getIsWorkTime(): boolean {
        return this.isWorkTime;
    }

    public get getDescription(): string | null {
        return this.description;
    }

    public setStartTime(startTime: string): void {
        this.startTime = startTime;
    }

    public setEndTime(endTime: string): void {
        this.endTime = endTime;
    }

    public setIsWorkTime(isWorkTime: boolean): void {
        this.isWorkTime = isWorkTime;
    }

    public setDescription(description: string | null): void {
        this.description = description;
    }
}