import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from './infrastructure/entities/organization.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from 'src/auth/auth.module';
import { OrganizationService } from './application/services/organization.service';
import { OrganizationController } from './presentation/controllers/organization.controller';
import { GetTeamsByOrgIdHandler } from './application/queries/handlers/get-teams-by-org-id.handler';
import { TeamEntity } from './infrastructure/entities/team.entity';
import { SelfImprovementEntity } from './infrastructure/entities/self-improvement.entity';
import { SelfImprovementItemEntity } from './infrastructure/entities/self-improvement-item.entity';
import { CreateSelfImprovementHandler } from './application/commands/handlers/create-self-improvement.handler';
import { GetSelfImprovementByOrgIdHandler } from './application/queries/handlers/get-self-improvements-by-org-id.handler';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrganizationEntity, TeamEntity, SelfImprovementEntity, SelfImprovementItemEntity]),
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
        CreateSelfImprovementHandler,

        // Query Handlers
        GetSelfImprovementByOrgIdHandler,
        GetTeamsByOrgIdHandler,
    ],
    exports: ['OrganizationSharedPort']
})
export class OrganizationModule { }
