import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RoleController } from './presentation/controllers/role.controller';
import { RoleService } from './application/services/role.service';
import { CreateRoleHandler } from './application/commands/handlers/create-role.handler';
import { GetRolesHandler } from './application/queries/handlers/get-roles.handler';
import { GetRoleDetailsHandler } from './application/queries/handlers/get-role-details.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './infrastructure/entities/role.entity';
import { PermissionEntity } from './infrastructure/entities/permission.entity';
import { RoleRepositoryImpl } from './infrastructure/repositories/role.repository';
import { RoleRepository } from './application/ports/role.repository';
import { PermissionRepositoryImpl } from './infrastructure/repositories/permission.repository';
import { PermissionRepository } from './application/ports/permission.repository';
import { AddPermissionsToRoleHandler } from './application/commands/handlers/add-permissions-to-role.handler';
import { PermissionController } from './presentation/controllers/permission.controller';
import { PermissionService } from './application/services/permission.service';
import { CreatePermissionHandler } from './application/commands/handlers/create-permission.handler';
import { GetAllPermissionsHandler } from './application/queries/handlers/get-all-permissions.handler';
import { AuthService } from './application/services/auth.service';
import { JwtStrategy } from './application/services/strategies/jwt.strategy';
import { UserSessionRepositoryImpl } from './infrastructure/repositories/user-session.repository';
import { UserSessionRepository } from './application/ports/user-session.repository';
import { UserRepository } from './application/ports/user.repository';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository';
import { UserEntity } from './infrastructure/entities/user.entity';
import { UserSessionEntity } from './infrastructure/entities/user-session.entity';
import { AuthController } from './presentation/controllers/auth.controller';
import { PolicyService } from './application/services/policy.service';
import { UserController } from './presentation/controllers/user.controller';
import { CreateUserHandler } from './application/commands/handlers/create-user.handler';
import { UpdateUserHandler } from './application/commands/handlers/update-user.handler';
import { DeleteUserHandler } from './application/commands/handlers/delete-user.handler';
import { GetUserByIdHandler } from './application/queries/handlers/get-user-by-id.handler';
import { GetAllUsersHandler } from './application/queries/handlers/get-all-users.handler';
import { LoginHandler } from './application/commands/handlers/login.handler';
import { JwtService } from '@nestjs/jwt';
import { UserSharedRepositoryImpl } from './infrastructure/repositories/user-shared.repository';
import { RefreshTokenHandler } from './application/commands/handlers/refresh-token.handler';
import { OrganizationModule } from 'src/organization/organization.module';
import { GetAllUsersWithTeamHandler } from './application/queries/handlers/get-all-users-with-team.handler';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RoleEntity,
            PermissionEntity,
            UserEntity,
            UserSessionEntity
        ]),
        CqrsModule,
        forwardRef(() => OrganizationModule),
    ],
    controllers: [
        RoleController,
        PermissionController,
        AuthController,
        UserController
    ],
    providers: [
        // Services
        AuthService,
        RoleService,
        PermissionService,
        PolicyService,

        // Repositories
        RoleRepositoryImpl,
        {
            provide: RoleRepository,
            useClass: RoleRepositoryImpl
        },
        PermissionRepositoryImpl,
        {
            provide: PermissionRepository,
            useClass: PermissionRepositoryImpl
        },
        UserSessionRepositoryImpl,
        {
            provide: UserSessionRepository,
            useClass: UserSessionRepositoryImpl
        },
        UserRepositoryImpl,
        {
            provide: UserRepository,
            useClass: UserRepositoryImpl
        },
        {
            provide: 'UserSharedRepository',
            useClass: UserSharedRepositoryImpl,
        },

        // Command Handlers
        CreateRoleHandler,
        AddPermissionsToRoleHandler,
        CreatePermissionHandler,
        CreateUserHandler,
        UpdateUserHandler,
        DeleteUserHandler,
        LoginHandler,
        RefreshTokenHandler,

        // Query Handlers
        GetUserByIdHandler,
        GetAllUsersHandler,
        GetRolesHandler,
        GetRoleDetailsHandler,
        GetAllPermissionsHandler,
        GetAllUsersWithTeamHandler,

        // Others
        JwtStrategy,
        JwtService,
    ],
    exports: ['UserSharedRepository'],
})
export class AuthModule { }
