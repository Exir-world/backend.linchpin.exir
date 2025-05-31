import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCheckPointEntity } from './infrastructure/entities/user-check-point.entity';
import { UserCheckPointAttachmentEntity } from './infrastructure/entities/user-check-point-attachment.entity';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserCheckPointEntity,
            UserCheckPointAttachmentEntity,
        ]),
        CqrsModule,
    ],
})
export class UserCheckPointsModule { }
