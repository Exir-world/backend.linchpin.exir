import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserIdsByDepartmentAndTeamQuery } from '../get-user-ids-by-department-and-team.query';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEmploymentSettingsEntity } from 'src/user-employment-settings/infrastructure/entities/user-employment-settings.entity';
import { Repository } from 'typeorm';

@QueryHandler(GetUserIdsByDepartmentAndTeamQuery)
export class GetUserIdsByDepartmentAndTeamHandler implements IQueryHandler<GetUserIdsByDepartmentAndTeamQuery> {
    constructor(
        @InjectRepository(UserEmploymentSettingsEntity)
        private readonly userEmploymentSettingsRepository: Repository<UserEmploymentSettingsEntity>
    ) { }

    async execute(query: GetUserIdsByDepartmentAndTeamQuery): Promise<number[]> {
        const { departmentId, teamId } = query;

        // ساخت شرط‌های فیلتر
        const condition: any = {};
        if (departmentId) {
            condition.departmentId = departmentId;
        }
        if (teamId) {
            condition.teamId = teamId;
        }

        // دریافت کاربران با شرط‌ها و انتخاب فقط فیلد id
        const settings = await this.userEmploymentSettingsRepository.find({ where: condition });

        // استخراج آیدی‌ها
        return settings.map(setting => setting.userId);
    }
}