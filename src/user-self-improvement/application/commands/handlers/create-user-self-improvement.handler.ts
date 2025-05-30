import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSelfImprovementEntity } from 'src/user-self-improvement/infrastructure/entities/user-self-improvement.entity';
import { CreateUserSelfImprovementCommand } from '../create-user-self-improvement.command';
import { UserSelfImprovement } from 'src/user-self-improvement/domain/user-self-improvement';
import { UserSelfImprovementMapper } from 'src/user-self-improvement/infrastructure/mappers/user-self-improvement.mapper';

@CommandHandler(CreateUserSelfImprovementCommand)
export class CreateUserSelfImprovementHandler implements ICommandHandler<CreateUserSelfImprovementCommand> {
    constructor(
        @InjectRepository(UserSelfImprovementEntity)
        private readonly userSelfImprovementRepository: Repository<UserSelfImprovementEntity>,
    ) { }

    async execute(command: CreateUserSelfImprovementCommand): Promise<UserSelfImprovement> {
        const { userId, improvementId, description, userScore } = command;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let entity = await this.userSelfImprovementRepository.findOne({
            where: {
                userId,
                improvementId,
                date: today,
            },
        });

        if (!entity) {
            entity = new UserSelfImprovementEntity();
            entity.userId = userId;
            entity.improvementId = improvementId;
            entity.date = today;
        }

        entity.userScore = userScore;
        entity.description = description;
        entity.supervisorScore = null;

        const savedItem = await this.userSelfImprovementRepository.save(entity);

        return UserSelfImprovementMapper.toDomain(savedItem);
    }
}
