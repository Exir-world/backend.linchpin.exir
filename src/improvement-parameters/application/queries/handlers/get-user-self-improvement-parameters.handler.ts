import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Between, IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';
import { GetUserImprovementParametersQuery } from '../get-user-improvement-parameters.query';
import { UserImprovementParameterEntity } from 'src/improvement-parameters/infrastructure/entities/user-improvement-parameter.entitiy';
import { ImprovementParameterEntity } from 'src/improvement-parameters/infrastructure/entities/improvement-parameter.entitiy';
import { ImprovementTypeEnum } from 'src/improvement-parameters/domain/enums/improvement-type.enum';

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
                type: Not(ImprovementTypeEnum.IMPROVEMENT),
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
                // [ImprovementTypeEnum.IMPROVEMENT]: 1,
                [ImprovementTypeEnum.INTELLIGENSE]: 2,
                [ImprovementTypeEnum.FORBIDDEN]: 3,
                [ImprovementTypeEnum.SENSE]: 4,
                [ImprovementTypeEnum.HUGGING]: 5,
                [ImprovementTypeEnum.MIND_FOCUS]: 6,
                // [ImprovementTypeEnum.CHANDELIER]: 7,
            };
            return typeOrder[a.type] - typeOrder[b.type] || a.id - b.id;
        });

        const groupedItems = Object.values(
            items.reduce((acc, item) => {
                if (!acc[item.type]) {
                    acc[item.type] = {
                        type: item.type,
                        title: this.i18n.t(`improvement.titles.${item.type}`),
                        items: [],
                    };
                }
                acc[item.type].items.push(item);
                return acc;
            }, {} as Record<string, { type: string; title: string; items: typeof items }>)
        );

        const totalScore = items.filter(item => item.done).length * 100000;

        return {
            score: totalScore,
            scoreIcon: 'https://cdn.exirtu.be/self-improvement/si_gem.svg',
            userItems: groupedItems,
        }
    }
}