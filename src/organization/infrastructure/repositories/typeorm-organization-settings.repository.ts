import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OrganizationSettingsRepositoryPort } from '../../application/ports/organization-settings.repository';
import { OrganizationSettingsDomain } from '../../domain/organization-settings.domain';
import { OrganizationSettings } from '../entities/organization-settings.entity';
import { OrganizationSettingsMapper } from '../mappers/organization-settings.mapper';

@Injectable()
export class TypeOrmOrganizationSettingsRepository implements OrganizationSettingsRepositoryPort {
    constructor(
        @InjectRepository(OrganizationSettings)
        private readonly repo: Repository<OrganizationSettings>,
    ) { }

    async findByOrganizationId(orgId: number): Promise<OrganizationSettingsDomain | null> {
        const entity = await this.repo.findOne({
            where: { organization: { id: orgId } },
            relations: ['organization'],
        });

        if (!entity) return null;

        return OrganizationSettingsMapper.toDomain(entity);
    }
}
