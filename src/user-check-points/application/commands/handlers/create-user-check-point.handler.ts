import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserCheckPointCommand } from '../create-user-check-point.command';
import { UserCheckPointEntity } from 'src/user-check-points/infrastructure/entities/user-check-point.entity';
import { UserCheckPointAttachmentEntity } from 'src/user-check-points/infrastructure/entities/user-check-point-attachment.entity';

@CommandHandler(CreateUserCheckPointCommand)
export class CreateUserCheckPointHandler implements ICommandHandler<CreateUserCheckPointCommand> {
    constructor(
        @InjectRepository(UserCheckPointEntity)
        private readonly userCPRepo: Repository<UserCheckPointEntity>,

        @InjectRepository(UserCheckPointAttachmentEntity)
        private readonly attachmentRepo: Repository<UserCheckPointAttachmentEntity>,
    ) { }

    async execute(command: CreateUserCheckPointCommand): Promise<UserCheckPointEntity> {
        const { dto } = command;

        const userCP = this.userCPRepo.create({
            userId: dto.userId,
            checkPointId: dto.checkPointId,
            lat: dto.lat,
            lng: dto.lng,
            report: dto.report ?? false,
        });

        const saved = await this.userCPRepo.save(userCP);

        if (dto.attachments?.length) {
            const attachments = dto.attachments.map((a) =>
                this.attachmentRepo.create({
                    userCheckPointId: saved.id,
                    filename: a.filename,
                    fileType: a.fileType,
                    fileUrl: a.fileUrl,
                    description: a.description ?? null,
                })
            );

            await this.attachmentRepo.save(attachments);
            saved.attachments = attachments;
        }

        return saved;
    }
}