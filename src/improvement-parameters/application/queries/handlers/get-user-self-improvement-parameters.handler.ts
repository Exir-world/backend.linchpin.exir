import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Between, IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { SelfImprovementItemTypeEnum } from 'src/organization/domain/enums/self-improvement-item-type.enum';
import { GetUserImprovementParametersQuery } from '../get-user-improvement-parameters.query';
import { UserImprovementParameterEntity } from 'src/improvement-parameters/infrastructure/entities/user-improvement-parameter.entitiy';
import { ImprovementParameterEntity } from 'src/improvement-parameters/infrastructure/entities/improvement-parameter.entitiy';

@QueryHandler(GetUserImprovementParametersQuery)
export class GetUserImprovementParametersQueryHandler implements IQueryHandler<GetUserImprovementParametersQuery> {
    constructor(
        @InjectRepository(ImprovementParameterEntity)
        private readonly improvementRepo: Repository<ImprovementParameterEntity>,
        @InjectRepository(UserImprovementParameterEntity)
        private readonly userImprovementRepo: Repository<UserImprovementParameterEntity>,
        private readonly i18n: I18nService,
    ) { }

    async execute(query: GetUserImprovementParametersQuery): Promise<any> {
        const { userId, parentId } = query;

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        const imps = await this.improvementRepo.find({
            where: {
                parent: parentId ? { id: parentId } : IsNull(),
            },
            relations: ['children']
        });

        const userImps = await this.userImprovementRepo.find({
            where: {
                userId,
                date: Between(startOfDay, endOfDay),
            },
            relations: ['improvementParameter'],
        });

        const items = imps.map(param => {
            const userParam = userImps.find(u => u.improvementParameter.id === param.id);
            return {
                id: param.id,
                title: this.i18n.t(param.title),
                type: param.type,
                image: param.image,
                color: param.color,
                date: userParam?.date,
                score: param.score,
                hasSub: param.children?.length > 0,
                done: (userParam?.userScore ?? 0) > 0,
            };
        }).sort((a, b) => {
            const typeOrder = {
                [SelfImprovementItemTypeEnum.IMPROVMENT]: 1,
                [SelfImprovementItemTypeEnum.INTELLIGENSE]: 2,
                [SelfImprovementItemTypeEnum.FORBIDDEN]: 3,
                [SelfImprovementItemTypeEnum.SENSE]: 4,
                [SelfImprovementItemTypeEnum.CHANDELIER]: 5,
            };
            return typeOrder[a.type] - typeOrder[b.type] || a.id - b.id;
        });

        return {
            score: 0,
            scoreIcon: 'https://cdn.exirtu.be/self-improvement/si_gem.svg',
            userItems: items,
        }
    }
}