import * as ms from "ms";

export function calculateJwtExpiresAt(expiration: string): number {
    const expiresInMs = ms(expiration); // Convert '30d' to milliseconds
    if (!expiresInMs) {
        throw new Error("Invalid expiration format");
    }
    return Date.now() + expiresInMs; // Current timestamp + expiration time
}
