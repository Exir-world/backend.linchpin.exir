import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpsertUserLastLocationCommand } from '../upsert-user-location.command';
import { UserLastLocation } from 'src/attendance/infrastructure/entities/user-last-location.entity';
import { DateUtil } from 'src/common/utils/date.util';


@CommandHandler(UpsertUserLastLocationCommand)
export class UpsertUserLastLocationHandler implements ICommandHandler<UpsertUserLastLocationCommand> {
    constructor(
        @InjectRepository(UserLastLocation)
        private readonly locationRepo: Repository<UserLastLocation>,
    ) { }

    async execute(command: UpsertUserLastLocationCommand): Promise<void> {
        const { userId, lat, lng } = command;

        const existing = await this.locationRepo.findOne({ where: { userId } });

        if (existing) {
            existing.lat = lat;
            existing.lng = lng;
            existing.lastVisitedAt = DateUtil.nowUTC();
            await this.locationRepo.save(existing);
        } else {
            const newEntry = this.locationRepo.create({ userId, lat, lng });
            await this.locationRepo.save(newEntry);
        }
    }
}
