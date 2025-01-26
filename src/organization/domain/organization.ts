export class Organization {
    private id: number;
    private name: string;
    private address: string;
    private description: string | null;

    constructor(id: number, name: string, address: string, description: string | null) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.description = description;
    }

    public get getId(): number {
        return this.id;
    }

    public get getName(): string {
        return this.name;
    }

    public get getAddress(): string {
        return this.address;
    }

    public get getDescription(): string | null {
        return this.description;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setAddress(address: string): void {
        this.address = address;
    }

    public setDescription(description: string | null): void {
        this.description = description;
    }
}