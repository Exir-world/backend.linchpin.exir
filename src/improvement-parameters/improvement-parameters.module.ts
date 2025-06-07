import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImprovementParameterEntity } from './infrastructure/entities/improvement-parameter.entitiy';
import { CreateImprovementParametersHandler } from './application/commands/handlers/create-improvement-parameters.handler';
import { GetImprovementParametersQueryHandler } from './application/queries/handlers/get-improvement-parameter.handler';
import { GetImprovementParameterSubQueryHandler } from './application/queries/handlers/get-improvement-parameter-sub.handler';
import { ImprovementParameterController } from './presentation/controllers/improvement-parameter.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UserImprovementParameterEntity } from './infrastructure/entities/user-improvement-parameter.entitiy';
import { GetUserImprovementParametersQueryHandler } from './application/queries/handlers/get-user-self-improvement-parameters.handler';
import { CreateUserImprovementParameterHandler } from './application/commands/handlers/create-user-improvement-parameter.handler';
import { UserImprovementParameterController } from './presentation/controllers/user-improvement-parameter.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ImprovementParameterEntity,
            UserImprovementParameterEntity,
        ]),
        CqrsModule,
    ],
    controllers: [
        ImprovementParameterController,
        UserImprovementParameterController,
    ],
    providers: [
        // Command Handlers
        CreateImprovementParametersHandler,
        CreateUserImprovementParameterHandler,

        // Query Handlers
        GetImprovementParametersQueryHandler,
        GetImprovementParameterSubQueryHandler,
        GetUserImprovementParametersQueryHandler,
    ],
})
export class ImprovementParametersModule { }
