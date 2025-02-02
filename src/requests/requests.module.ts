import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEntity } from './infrastructure/entities/request.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { RequestController } from './presentation/request.controller';
import { RequestService } from './application/services/requests.service';
import { RequestRepositoryImpl } from './infrastructure/repositories/request.repository';
import { RequestRepository } from './application/ports/request.repository';
import { CreateRequestHandler } from './application/commands/handlers/create-request.handler';
import { ReviewRequestHandler } from './application/commands/handlers/review-request.handler';
import { GetUserRequestsHandler } from './application/queries/handlers/get-user-requests.handler';
import { GetAllRequestsHandler } from './application/queries/handlers/get-all-requests.handler';
import { CancelRequestHandler } from './application/commands/handlers/cancel-request.handler';
import { LeaveModule } from 'src/leave/leave.module';
import { AttendanceModule } from 'src/attendance/attendance.module';
import { AuthModule } from 'src/auth/auth.module';
import { GetRequestTypesHandler } from './application/queries/handlers/get-request-types.handler';

@Module({
    imports: [
        TypeOrmModule.forFeature([RequestEntity]),
        CqrsModule,
        LeaveModule,
        AttendanceModule,
        AuthModule
    ],
    controllers: [RequestController],
    providers: [
        // Services
        RequestService,

        // Repositories
        RequestRepositoryImpl,
        {
            provide: RequestRepository,
            useClass: RequestRepositoryImpl
        },
        {
            provide: 'ILeaveSharedRepository',
            useExisting: 'LeaveSharedRepository',
        },
        {
            provide: 'IAttendanceSharedRepository',
            useExisting: 'AttendanceSharedRepository',
        },

        // Command Handlers
        CreateRequestHandler,
        ReviewRequestHandler,
        CancelRequestHandler,

        // Query Handlers
        GetUserRequestsHandler,
        GetAllRequestsHandler,
        GetRequestTypesHandler,
    ],
    exports: [
        'IAttendanceSharedRepository'
    ]
})
export class RequestsModule { }
