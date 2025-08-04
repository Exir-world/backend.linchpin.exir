import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCheckPointCommand } from '../update-check-point.command';
import { CheckPointEntity } from 'src/check-points/infrastructure/entities/check-point.entity';

@CommandHandler(UpdateCheckPointCommand)
export class UpdateCheckPointHandler implements ICommandHandler<UpdateCheckPointCommand> {
    constructor(
        @InjectRepository(CheckPointEntity)
        private readonly checkPointRepo: Repository<CheckPointEntity>,
    ) { }

    async execute(command: UpdateCheckPointCommand): Promise<CheckPointEntity> {
        const { id, dto } = command;
        await this.checkPointRepo.update(id, dto);
        return await this.checkPointRepo.findOne({ where: { id }, relations: ['items'] });
    }
}