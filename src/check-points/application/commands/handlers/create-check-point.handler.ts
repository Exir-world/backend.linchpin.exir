import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCheckPointCommand } from '../create-check-point.command';
import { CheckPointEntity } from 'src/check-points/infrastructure/entities/check-point.entity';
import { CheckPointItemEntity } from 'src/check-points/infrastructure/entities/check-point-item.entity';

@CommandHandler(CreateCheckPointCommand)
export class CreateCheckPointHandler implements ICommandHandler<CreateCheckPointCommand> {
    constructor(
        @InjectRepository(CheckPointEntity)
        private readonly checkPointRepo: Repository<CheckPointEntity>,
        @InjectRepository(CheckPointItemEntity)
        private readonly itemRepo: Repository<CheckPointItemEntity>,
    ) { }

    async execute(command: CreateCheckPointCommand): Promise<CheckPointEntity> {
        const { dto } = command;

        const checkPoint = this.checkPointRepo.create({
            organizationId: dto.organizationId,
            title: dto.title,
            isActive: dto.isActive ?? true,
        });

        const savedCheckPoint = await this.checkPointRepo.save(checkPoint);

        const items = dto.items.map((item) =>
            this.itemRepo.create({
                lat: item.lat,
                lng: item.lng,
                radius: item.radius ?? 50,
                needReport: item.needReport ?? false,
                checkPointId: savedCheckPoint.id,
            }),
        );

        await this.itemRepo.save(items);
        savedCheckPoint.items = items;
        return savedCheckPoint;
    }
}
