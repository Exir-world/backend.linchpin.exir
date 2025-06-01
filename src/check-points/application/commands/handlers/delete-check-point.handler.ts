import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteCheckPointCommand } from '../delete-check-point.command';
import { CheckPointEntity } from 'src/check-points/infrastructure/entities/check-point.entity';

@CommandHandler(DeleteCheckPointCommand)
export class DeleteCheckPointHandler implements ICommandHandler<DeleteCheckPointCommand> {
    constructor(
        @InjectRepository(CheckPointEntity)
        private readonly checkPointRepo: Repository<CheckPointEntity>,
    ) { }

    async execute(command: DeleteCheckPointCommand): Promise<void> {
        await this.checkPointRepo.delete(command.id);
    }
}