import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RoleController } from './presentation/controllers/role.controller';
import { CreateRoleHandler } from './application/commands/handlers/create-role.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './infrastructure/entities/role.entity';
import { AuthService } from './application/services/auth.service';
import { JwtStrategy } from './application/services/strategies/jwt.strategy';
import { UserSessionRepositoryImpl } from './infrastructure/repositories/user-session.repository';
import { UserSessionRepository } from './application/ports/user-session.repository';
import { UserRepository } from './application/ports/user.repository';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository';
import { UserEntity } from './infrastructure/entities/user.entity';
import { UserSessionEntity } from './infrastructure/entities/user-session.entity';
import { AuthController } from './presentation/controllers/auth.controller';
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
import { UserEmploymentSettingsModule } from 'src/user-employment-settings/user-employment-settings.module';
import { LoginAdminHandler } from './application/commands/handlers/login-admin.handler';
import { UserSessionSharedRepositoryImpl } from './infrastructure/repositories/user-session-shared.repository';
import { UpdateRoleHandler } from './application/commands/handlers/update-role.handler';
import { GetAllRolesHandler } from './application/queries/get-roles.handler';
import { GetRoleByIdHandler } from './application/queries/get-role.handler';
import { RolesRepository } from './infrastructure/repositories/role.repository';
import { GetAllPermissionHandler } from './application/queries/handlers/get-all-permissions.handler';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RoleEntity,
            UserEntity,
            UserSessionEntity
        ]),
        CqrsModule,
        forwardRef(() => OrganizationModule),
        UserEmploymentSettingsModule,
    ],
    controllers: [
        RoleController,
        AuthController,
        UserController,
    ],
    providers: [
        // Services
        AuthService,

        // Repositories
        RolesRepository,
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
        {
            provide: 'UserSessionSharedRepository',
            useClass: UserSessionSharedRepositoryImpl,
        },

        // Command Handlers
        CreateRoleHandler,
        UpdateRoleHandler,
        CreateUserHandler,
        UpdateUserHandler,
        DeleteUserHandler,
        LoginHandler,
        RefreshTokenHandler,
        LoginAdminHandler,

        // Query Handlers
        GetUserByIdHandler,
        GetAllUsersHandler,
        GetAllRolesHandler,
        GetRoleByIdHandler,
        GetAllPermissionHandler,
        GetAllUsersWithTeamHandler,

        // Others
        JwtStrategy,
        JwtService,
    ],
    exports: ['UserSharedRepository', 'UserSessionSharedRepository'],
})
export class AuthModule { }
