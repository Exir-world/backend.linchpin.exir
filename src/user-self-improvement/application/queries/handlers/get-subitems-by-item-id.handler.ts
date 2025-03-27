import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationSharedPort } from 'src/organization/application/ports/organization-shared.port';
import { Inject } from '@nestjs/common';
import { UserSelfImprovementEntity } from 'src/user-self-improvement/infrastructure/entities/user-self-improvement.entity';
import { I18nService } from 'nestjs-i18n';
import { SelfImprovementItemTypeEnum } from 'src/organization/domain/enums/self-improvement-item-type.enum';
import { GetSubItemsByItemIdQuery } from '../get-subitems-by-item-id.query ';

@QueryHandler(GetSubItemsByItemIdQuery)
export class GetSubItemsByItemIdHandler implements IQueryHandler<GetSubItemsByItemIdQuery> {
    constructor(
        @Inject('OrganizationSharedPort')
        private readonly organizationService: OrganizationSharedPort,
        @InjectRepository(UserSelfImprovementEntity)
        private readonly repository: Repository<UserSelfImprovementEntity>,
        private readonly i18n: I18nService,

    ) { }

    async execute(query: GetSubItemsByItemIdQuery): Promise<any> {
        const { userId, itemId } = query;

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const imps = await this.organizationService.getSelfImprovementsSubItemsId(itemId);

        // return imps;

        const userImps = await this.repository.find({
            where: {
                userId,
                date: Between(startOfDay, endOfDay),
            },
        });

        const subItems = imps
            .map(item => ({
                id: item.id,
                title: this.i18n.t(item.title),
                score: item.score,
                date: userImps.find(userImp => userImp.improvementId === item.id)?.date,
                userScore: userImps.find(u => u.improvementId == item.id)?.userScore || 0,
                done: !!userImps.find(u => u.improvementId == item.id)?.userScore,
            })).sort((a, b) => a.id - b.id);

        return subItems
    }
}