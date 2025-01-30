import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from './infrastructure/entities/organization.entity';
import { OrganizationTimesEntity } from './infrastructure/entities/organization-times.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from 'src/auth/auth.module';
import { OrganizationService } from './application/services/organization.service';
import { GetTimesByOrgIdHandler } from './application/queries/handlers/get-times-by-org-id.handler';
import { OrganizationCriterionEntity } from './infrastructure/entities/organization-criterion.entity';
import { OrganizationController } from './presentation/controllers/organization.controller';
import { GetCriteriaByOrgIdHandler } from './application/queries/handlers/get-creteria-by-org-id.handler';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrganizationEntity, OrganizationTimesEntity, OrganizationCriterionEntity]),
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
        GetTimesByOrgIdHandler,
        GetCriteriaByOrgIdHandler,
    ],
    exports: ['OrganizationSharedPort']
})
export class OrganizationModule { }
