import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCriterionEntity } from './infrastructure/entities/user-criterion.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserCriterionEntity]),
    ]
})
export class UserCriterionModule { }
