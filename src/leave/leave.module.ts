import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveEntity } from './infrastructure/entities/leave.entity';
import { LeaveRepository } from './application/ports/leave.repository';
import { LeaveRepositoryImpl } from './infrastructure/repositories/leave.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateLeaveHandler } from './application/commands/handlers/create-leave.handler';
import { GetUserLeavesHandler } from './application/queries/handlers/get-user-leaves.handler';
import { LeaveController } from './presentation/controllers/leave.controller';
import { LeaveService } from './application/services/leave.service';
import { LeaveSharedRepositoryImpl } from './infrastructure/repositories/leave-shared.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([LeaveEntity]),
        CqrsModule,
        AuthModule,
    ],
    controllers: [LeaveController],
    providers: [
        // Services
        LeaveService,

        // Repositories
        LeaveRepositoryImpl,
        {
            provide: LeaveRepository,
            useClass: LeaveRepositoryImpl,
        },
        {
            provide: 'LeaveSharedRepository',
            useClass: LeaveSharedRepositoryImpl,
        },

        // Command Handlers
        CreateLeaveHandler,

        // Query Handlers
        GetUserLeavesHandler,
    ],
    exports: ['LeaveSharedRepository']
})
export class LeaveModule { }
