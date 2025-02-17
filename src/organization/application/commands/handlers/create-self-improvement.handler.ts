import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSelfImprovementCommand } from '../create-self-improvement.command';
import { SelfImprovementEntity } from 'src/organization/infrastructure/entities/self-improvement.entity';
import { SelfImprovementItemEntity } from 'src/organization/infrastructure/entities/self-improvement-item.entity';

@CommandHandler(CreateSelfImprovementCommand)
export class CreateSelfImprovementHandler implements ICommandHandler<CreateSelfImprovementCommand> {

    constructor(
        @InjectRepository(SelfImprovementEntity)
        private readonly selfImprovementRepo: Repository<SelfImprovementEntity>,

        @InjectRepository(SelfImprovementItemEntity)
        private readonly selfImprovementItemRepo: Repository<SelfImprovementItemEntity>,
    ) { }

    async execute(command: CreateSelfImprovementCommand): Promise<SelfImprovementEntity> {
        const { organizationId, title, description, items } = command;

        // ایجاد Self-Improvement جدید
        const selfImprovement = new SelfImprovementEntity();
        selfImprovement.organizationId = organizationId;
        selfImprovement.title = title;
        selfImprovement.description = description || null;

        const savedSelfImprovement = await this.selfImprovementRepo.save(selfImprovement);

        // ایجاد و ذخیره آیتم‌های مربوط به Self-Improvement
        const itemEntities = items.map(item => {
            const newItem = new SelfImprovementItemEntity();
            newItem.title = item.title;
            newItem.score = item.score;
            newItem.image = item.image;
            newItem.color = item.color;
            newItem.selfImprovement = savedSelfImprovement;
            return newItem;
        });

        await this.selfImprovementItemRepo.save(itemEntities);

        return savedSelfImprovement;
    }
}
