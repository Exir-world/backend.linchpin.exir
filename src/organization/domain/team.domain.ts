export class Team {
    private id: number;
    private organizationId: number;
    private title: string;
    private color: string;
    private description: string;
    private supervisorId: number | null;

    constructor(
        id: number,
        organizationId: number,
        title: string,
        color: string,
        description: string,
        supervisorId: number | null = null,
    ) {
        this.id = id;
        this.organizationId = organizationId;
        this.title = title;
        this.color = color;
        this.description = description;
        this.supervisorId = supervisorId;
    }

    public get getId(): number {
        return this.id;
    }

    public get getOrganizationId(): number {
        return this.organizationId;
    }

    public get getTitle(): string {
        return this.title;
    }

    public get getColor(): string {
        return this.color;
    }

    public get getDescription(): string {
        return this.description;
    }

    public get getSupervisorId(): number | null {
        return this.supervisorId;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public setColor(color: string): void {
        this.color = color;
    }

    public setDescription(description: string | null): void {
        this.description = description;
    }

    public setSupervisorId(supervisorId: number | null): void {
        this.supervisorId = supervisorId;
    }
}