import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllUsersQuery } from '../get-all-users.query';
import { UserRepository } from '../../ports/user.repository';
import { User } from 'src/auth/domain/user';
import { Inject } from '@nestjs/common';
import { OrganizationSharedPort } from 'src/organization/application/ports/organization-shared.port';
import { ILike, In } from 'typeorm';
import { UserEmploymentSettingsSharedPort } from 'src/user-employment-settings/application/ports/user-employment-settings-shared.port';

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery> {
    constructor(
        private readonly userRepository: UserRepository,
        @Inject('UserEmploymentSettingsSharedPort')
        private readonly settingsService: UserEmploymentSettingsSharedPort,
    ) { }

    async execute(query: GetAllUsersQuery): Promise<any> {
        const { organizationId, query: queryParams } = query;
        const {
            departmentId,
            teamId,
            personnelCode,
            nationalCode,
            phoneNumber,
            name,
            page = 1,
            limit = 10,
        } = queryParams || {};

        // ساخت شرط‌های فیلتر
        const condition: any = {};

        condition.organizationId = organizationId;

        if (personnelCode) {
            condition.personnelCode = personnelCode;
        }
        if (nationalCode) {
            condition.nationalCode = ILike(`${nationalCode}%`); // شروع با nationalCode
        }
        if (phoneNumber) {
            condition.phoneNumber = ILike(`${phoneNumber}%`); // شروع با phoneNumber
        }
        if (name) {
            condition.name = ILike(`${name}%`); // شروع با name
        }

        if (departmentId || teamId) {
            const userIds = await this.settingsService.getUserIdsByDepartmentAndTeam(departmentId, teamId);
            if (userIds.length > 0) {
                condition.id = In(userIds);
            } else {
                return { users: [], total: 0 };
            }
        }

        // محاسبه offset برای صفحه‌بندی
        const offset = (page - 1) * limit;

        // دریافت کاربران با شرط‌ها و صفحه‌بندی
        const [users, total] = await this.userRepository.findByCondition(
            condition,
            { take: limit, skip: offset },
        );


        return { users, total };
    }
}
