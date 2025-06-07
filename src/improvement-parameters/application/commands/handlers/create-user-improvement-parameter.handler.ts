import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserImprovementParameterCommand } from '../create-user-improvement-parameter.command';
import { UserImprovementParameterEntity } from 'src/improvement-parameters/infrastructure/entities/user-improvement-parameter.entitiy';
import { ImprovementParameterEntity } from 'src/improvement-parameters/infrastructure/entities/improvement-parameter.entitiy';

@CommandHandler(CreateUserImprovementParameterCommand)
export class CreateUserImprovementParameterHandler implements ICommandHandler<CreateUserImprovementParameterCommand> {
    constructor(
        @InjectRepository(ImprovementParameterEntity)
        private readonly improvementRepository: Repository<ImprovementParameterEntity>,
        @InjectRepository(UserImprovementParameterEntity)
        private readonly userImprovementRepository: Repository<UserImprovementParameterEntity>,
    ) { }

    async execute(command: CreateUserImprovementParameterCommand): Promise<number> {
        const { userId, improvementId, description, userScore } = command;

        const improvementParameter = await this.improvementRepository.findOne({
            where: { id: improvementId },
            relations: ['parent'],
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let entity = await this.userImprovementRepository.findOne({
            where: {
                userId,
                improvementParameter: { id: improvementId },
                date: today,
            },
            relations: ['improvementParameter.parent'],
        });

        console.log(entity);


        if (!entity) {
            entity = new UserImprovementParameterEntity();
            entity.userId = userId;
            entity.improvementParameter = improvementParameter;
            entity.date = today;
        }

        entity.userScore = userScore;
        entity.description = description;
        entity.supervisorScore = null;

        await this.userImprovementRepository.save(entity);

        return improvementParameter.parent?.id;
    }
}
