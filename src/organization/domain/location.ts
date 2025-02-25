export class Location {
    id?: number;
    organizationId: number;
    lat: number;
    lng: number;
    radius: number;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        organizationId: number,
        lat: number,
        lng: number,
        radius: number,
        id?: number,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        this.id = id;
        this.organizationId = organizationId;
        this.lat = lat;
        this.lng = lng;
        this.radius = radius;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
