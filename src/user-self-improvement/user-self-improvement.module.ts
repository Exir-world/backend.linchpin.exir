import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSelfImprovementEntity } from './infrastructure/entities/user-self-improvement.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserSelfImprovementHandler } from './application/commands/handlers/create-user-self-improvement.handler';
import { UserSelfImprovementController } from './presentation/controllers/user-self-improvement.controller';
import { GetUserSelfImprovementByOrgIdHandler } from './application/queries/handlers/get-user-self-improvements-by-org-id.handler';
import { OrganizationModule } from 'src/organization/organization.module';

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([UserSelfImprovementEntity]),
        OrganizationModule,
    ],
    controllers: [
        UserSelfImprovementController,
    ],
    providers: [
        GetUserSelfImprovementByOrgIdHandler,
        CreateUserSelfImprovementHandler,
    ],
})
export class UserSelfImprovementModule { }
