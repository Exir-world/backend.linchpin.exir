import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserCriteriaCommand } from '../create-user-criterion.command';
import { UserCriterionEntity } from 'src/user-criterion/infrastructure/entities/user-criterion.entity';

@CommandHandler(CreateUserCriteriaCommand)
export class CreateUserCriteriaHandler implements ICommandHandler<CreateUserCriteriaCommand> {
    constructor(
        @InjectRepository(UserCriterionEntity)
        private readonly userCriterionRepository: Repository<UserCriterionEntity>,
    ) { }

    async execute(command: CreateUserCriteriaCommand): Promise<UserCriterionEntity[]> {
        const { userId, criteria } = command;

        const userCriteria = criteria.map(({ criterionId, userScore, date }) => {
            const entity = new UserCriterionEntity();
            entity.userId = userId;
            entity.criterionId = criterionId;
            entity.userScore = userScore;
            entity.date = date;
            entity.supervisorScore = null; // Default value
            return entity;
        });

        return await this.userCriterionRepository.save(userCriteria);
    }
}
