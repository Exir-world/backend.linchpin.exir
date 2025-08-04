import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserTimesCommand } from '../create-user-times.command';
import { UserTimesEntity } from 'src/user-times/infrastructure/entities/user-times.entity';
import { WeeklyTimesEntity } from 'src/user-times/infrastructure/entities/weekly-times.entity';

@CommandHandler(CreateUserTimesCommand)
export class CreateUserTimesHandler implements ICommandHandler<CreateUserTimesCommand> {
    constructor(
        @InjectRepository(UserTimesEntity)
        private readonly userTimesRepo: Repository<UserTimesEntity>,

        @InjectRepository(WeeklyTimesEntity)
        private readonly weeklyRepo: Repository<WeeklyTimesEntity>,
    ) { }

    async execute(command: CreateUserTimesCommand): Promise<UserTimesEntity> {
        const { dto } = command;

        const userTimes = this.userTimesRepo.create({ userId: dto.userId });
        const savedUserTimes = await this.userTimesRepo.save(userTimes);

        const weeklyTimes = dto.weeklyTimes.map((time) =>
            this.weeklyRepo.create({
                userTimes: savedUserTimes,
                dayOfWeek: Number(time.dayOfWeek),
                startTime: time.startTime,
                endTime: time.endTime,
                isAbsent: time.isAbsent ?? false,
            })
        );

        await this.weeklyRepo.save(weeklyTimes);
        savedUserTimes.weeklyTimes = weeklyTimes;
        return savedUserTimes;
    }
}
