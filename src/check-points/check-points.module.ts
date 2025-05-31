import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckPointEntity } from './infrastructure/entities/check-point.entity';
import { CheckPointItemEntity } from './infrastructure/entities/check-point-item.entity';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CheckPointEntity,
            CheckPointItemEntity,
        ]),
        CqrsModule,
    ],
})
export class CheckPointsModule { }
