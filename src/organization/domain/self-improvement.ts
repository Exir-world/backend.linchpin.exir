export class SelfImprovement {
    private id: number;
    private organizationId: number;
    private title: string;
    private isDefault: boolean;
    private description: string;
    private items: any[];

    constructor(
        id: number,
        organizationId: number,
        title: string,
        isDefault: boolean,
        description: string,
        items: any[],
    ) {
        this.id = id;
        this.organizationId = organizationId;
        this.title = title;
        this.isDefault = isDefault;
        this.description = description;
        this.items = items;
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

    public get getIsDefault(): boolean {
        return this.isDefault;
    }

    public get getDescription(): string {
        return this.description;
    }

    public get getItems(): any[] {
        return this.items;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public setIsDefault(isDefault: boolean): void {
        this.isDefault = isDefault;
    }

    public setDescription(description: string | null): void {
        this.description = description;
    }
}