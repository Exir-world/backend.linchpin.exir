import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateImprovementParametersCommand } from '../create-improvement-parameters.command';
import { ImprovementParameterEntity } from 'src/improvement-parameters/infrastructure/entities/improvement-parameter.entitiy';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@CommandHandler(CreateImprovementParametersCommand)
export class CreateImprovementParametersHandler implements ICommandHandler<CreateImprovementParametersCommand> {
    constructor(
        @InjectRepository(ImprovementParameterEntity)
        private readonly repo: Repository<ImprovementParameterEntity>,
    ) { }

    async execute(command: CreateImprovementParametersCommand): Promise<ImprovementParameterEntity[]> {
        const result: ImprovementParameterEntity[] = [];

        for (const item of command.items) {
            // 1. ساخت آیتم اصلی
            const parentEntity = this.repo.create({
                title: item.title,
                type: item.type,
                image: item.image,
                color: item.color,
                score: item.score ?? [],
                parent: null,
            });

            const savedParent = await this.repo.save(parentEntity);
            result.push(savedParent);

            // 2. ساخت زیرآیتم‌ها
            if (item.children?.length) {
                const childEntities = item.children.map(child =>
                    this.repo.create({
                        title: child.title,
                        type: child.type,
                        image: child.image,
                        color: child.color,
                        score: child.score,
                        parent: savedParent,
                    }),
                );

                const savedChildren = await this.repo.save(childEntities);
                result.push(...savedChildren);
            }
        }

        return result;
    }
}
