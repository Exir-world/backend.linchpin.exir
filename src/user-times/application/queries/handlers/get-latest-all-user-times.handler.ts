import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTimesEntity } from 'src/user-times/infrastructure/entities/user-times.entity';
import { GetLatestAllUserTimesQuery } from '../get-latest-all-user-times.query';

@QueryHandler(GetLatestAllUserTimesQuery)
export class GetLatestAllUserTimesHandler implements IQueryHandler<GetLatestAllUserTimesQuery> {
    constructor(
        @InjectRepository(UserTimesEntity)
        private readonly userTimesRepo: Repository<UserTimesEntity>,
    ) { }

    async execute(_: GetLatestAllUserTimesQuery): Promise<UserTimesEntity[]> {
        const jsDay = new Date().getDay();
        const shamsiDay = (jsDay + 1) % 7;

        return await this.userTimesRepo
            .createQueryBuilder('userTimes')
            .leftJoinAndSelect('userTimes.weeklyTimes', 'weeklyTimes') // لود همه weeklyTimes مرتبط
            .where('weeklyTimes.dayOfWeek = :day', { day: shamsiDay }) // شرط روی dayOfWeek
            // .andWhere('userTimes.isActive = :isActive', { isActive: true }) // شرط برای شروع روز
            .distinctOn(['userTimes.userId']) // انتخاب رکورد یکتا برای هر userId
            .orderBy('userTimes.userId', 'ASC') // مرتب‌سازی بر اساس userId
            .addOrderBy('userTimes.createdAt', 'DESC') // انتخاب آخرین رکورد بر اساس createdAt
            .getMany();
    }
}
