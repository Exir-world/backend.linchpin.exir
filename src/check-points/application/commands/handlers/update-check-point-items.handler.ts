import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCheckPointItemsCommand } from '../update-check-point-items.command';
import { CheckPointItemEntity } from 'src/check-points/infrastructure/entities/check-point-item.entity';

@CommandHandler(UpdateCheckPointItemsCommand)
export class UpdateCheckPointItemsHandler
    implements ICommandHandler<UpdateCheckPointItemsCommand> {
    constructor(
        @InjectRepository(CheckPointItemEntity)
        private readonly itemRepo: Repository<CheckPointItemEntity>,
    ) { }

    async execute(command: UpdateCheckPointItemsCommand): Promise<void> {
        const { checkPointId, dto } = command;

        for (const item of dto.items) {
            if (item.id) {
                // آپدیت آیتم موجود
                await this.itemRepo.update(
                    { id: item.id, checkPointId },
                    {
                        lat: item.lat,
                        lng: item.lng,
                        radius: item.radius ?? 50,
                        needReport: item.needReport ?? false,
                    },
                );
            } else {
                // اضافه کردن آیتم جدید
                const newItem = this.itemRepo.create({
                    checkPointId,
                    lat: item.lat,
                    lng: item.lng,
                    radius: item.radius ?? 50,
                    needReport: item.needReport ?? false,
                });
                await this.itemRepo.save(newItem);
            }
        }
    }
}
