import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationSharedPort } from 'src/organization/application/ports/organization-shared.port';
import { Inject } from '@nestjs/common';
import { GetUserSelfImprovementsByOrgIdQuery } from '../get-user-self-improvements-by-org-id.query';
import { UserSelfImprovementEntity } from 'src/user-self-improvement/infrastructure/entities/user-self-improvement.entity';
import { I18nService } from 'nestjs-i18n';
import { SelfImprovementItemTypeEnum } from 'src/organization/domain/enums/self-improvement-item-type.enum';

@QueryHandler(GetUserSelfImprovementsByOrgIdQuery)
export class GetUserSelfImprovementByOrgIdHandler implements IQueryHandler<GetUserSelfImprovementsByOrgIdQuery> {
    constructor(
        @Inject('OrganizationSharedPort')
        private readonly organizationService: OrganizationSharedPort,
        @InjectRepository(UserSelfImprovementEntity)
        private readonly repository: Repository<UserSelfImprovementEntity>,
        private readonly i18n: I18nService,
    ) { }

    async execute(query: GetUserSelfImprovementsByOrgIdQuery): Promise<any> {
        const userId = query.userId;

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const imps = await this.organizationService.getSelfImprovementsByOrgId(1);

        // return imps;

        const userImps = await this.repository.find({
            where: {
                userId,
                date: Between(startOfDay, endOfDay),
            },
        });

        const improvmentItems = imps[0].items.filter(i => i.type == SelfImprovementItemTypeEnum.IMPROVMENT)
            .map(item => ({
                id: item.subItems?.[0]?.id,
                title: this.i18n.t(item.title),
                image: item.image,
                color: item.color,
                date: userImps.find(userImp => userImp.improvementId === item.subItems?.[0]?.id)?.date,
                done: (userImps.find(userImp => userImp.improvementId === item.subItems?.[0]?.id)?.userScore || 0) == item.subItems?.[0]?.score?.[0],
            })).sort((a, b) => a.id - b.id);

        const intelligenseItems = imps[0].items.filter(i => i.type == SelfImprovementItemTypeEnum.INTELLIGENSE)
            .map(item => ({
                id: item.id,
                title: this.i18n.t(item.title),
                image: item.image,
                color: item.color,
                date: userImps.find(userImp => userImp.improvementId === item.id)?.date,
                subItems: item.subItems.map(
                    subItem => ({
                        ...subItem,
                        userScore: userImps.find(u => u.improvementId == subItem.id)?.userScore || 0,
                        done: !!userImps.find(u => u.improvementId == subItem.id)?.userScore
                    })
                ),
                // done: (userImps.find(userImp => userImp.improvementId === item.subItems?.[0]?.id)?.userScore || 0) == item.subItems?.[0]?.score?.[0],
                // done: (userImps.find(userImp => userImp.improvementId === item.id)?.userScore || 0) == item.sub,
            })).sort((a, b) => a.id - b.id);

        const forbiddenItems = imps[0].items.filter(i => i.type == SelfImprovementItemTypeEnum.FORBIDDEN)
            .map(item => ({
                id: item.subItems?.[0]?.id,
                title: this.i18n.t(item.title),
                image: item.image,
                color: item.color,
                date: userImps.find(userImp => userImp.improvementId === item.id)?.date,
                done: (userImps.find(userImp => userImp.improvementId === item.subItems?.[0]?.id)?.userScore || 0) == item.subItems?.[0]?.score?.[0],
                // done: (userImps.find(userImp => userImp.improvementId === item.id)?.userScore || 0) == item.sub,
            })).sort((a, b) => a.id - b.id);

        return {
            score: 0,
            scoreIcon: 'https://cdn.exirtu.be/self-improvement/si_gem.svg',
            improvmentItems,
            intelligenseItems,
            forbiddenItems,
        }
    }
}