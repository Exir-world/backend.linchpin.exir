export class Team {
    private id: number;
    private organizationId: number;
    private title: string;
    private description: string;

    constructor(
        id: number,
        organizationId: number,
        title: string,
        description: string,
    ) {
        this.id = id;
        this.organizationId = organizationId;
        this.title = title;
        this.description = description;
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

    public get getDescription(): string {
        return this.description;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public setDescription(description: string | null): void {
        this.description = description;
    }
}