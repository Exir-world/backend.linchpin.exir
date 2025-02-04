import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from './infrastructure/entities/organization.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from 'src/auth/auth.module';
import { OrganizationService } from './application/services/organization.service';
import { OrganizationCriterionEntity } from './infrastructure/entities/organization-criterion.entity';
import { OrganizationController } from './presentation/controllers/organization.controller';
import { GetCriteriaByOrgIdHandler } from './application/queries/handlers/get-creteria-by-org-id.handler';
import { GetTeamsByOrgIdHandler } from './application/queries/handlers/get-teams-by-org-id.handler';
import { TeamEntity } from './infrastructure/entities/team.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrganizationEntity, OrganizationCriterionEntity, TeamEntity]),
        CqrsModule,
        AuthModule,
    ],
    controllers: [OrganizationController],
    providers: [
        // Services
        OrganizationService,

        // Repositories
        // LeaveRepositoryImpl,
        // {
        //     provide: LeaveRepository,
        //     useClass: LeaveRepositoryImpl,
        // },
        // {
        //     provide: 'LeaveSharedRepository',
        //     useClass: LeaveSharedRepositoryImpl,
        // },

        {
            provide: 'OrganizationSharedPort',
            useClass: OrganizationService,
        },


        // Command Handlers

        // Query Handlers
        GetCriteriaByOrgIdHandler,
        GetTeamsByOrgIdHandler,
    ],
    exports: ['OrganizationSharedPort']
})
export class OrganizationModule { }
