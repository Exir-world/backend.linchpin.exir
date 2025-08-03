export enum Permission {
    // Role
    CreateRole = 'role:create',
    ReadRole = 'role:read',
    UpdateRole = 'role:update',
    DeleteRole = 'role:delete',

    // User
    CreateUser = 'user:create',
    ReadUser = 'user:read',
    UpdateUser = 'user:update',
    DeleteUser = 'user:delete',

    // Requests
    ReadRequest = 'request:read',
    ReviewRequest = 'request:review',
}