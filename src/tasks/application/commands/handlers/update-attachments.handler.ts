import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAttachmentsCommand } from '../update-attachments.command';
import { AttachmentEntity } from 'src/tasks/infrastructure/entities/attachment.entity';
import { TaskEntity } from 'src/tasks/infrastructure/entities/task.entity';
import { NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';

@CommandHandler(UpdateAttachmentsCommand)
export class UpdateAttachmentsHandler implements ICommandHandler<UpdateAttachmentsCommand> {
    constructor(
        @InjectRepository(AttachmentEntity)
        private readonly attachmentRepository: Repository<AttachmentEntity>,
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        private readonly i18n: I18nService,
    ) { }

    async execute(command: UpdateAttachmentsCommand): Promise<void> {
        const { taskId, creatorId, attachments } = command;

        const task = await this.taskRepository.findOne({ where: { id: taskId, createdBy: creatorId } });
        if (!task) {
            throw new NotFoundException(this.i18n.t('task.task.404'));
        }

        const existingAttachments = await this.attachmentRepository.find({ where: { task: { id: taskId } } });

        // حذف اتچمنت‌هایی که در لیست جدید نیستند
        const attachmentsToRemove = existingAttachments.filter(a => !attachments.some(att => att.id === a.id));
        await this.attachmentRepository.remove(attachmentsToRemove);

        // اضافه اتچمنت‌ها
        const attachmentsToCreate = attachments.filter(a => !a.id || !existingAttachments.some(att => att.id === a.id));
        for (const attachment of attachmentsToCreate) {
            const newAttachment = this.attachmentRepository.create({
                task,
                fileType: attachment.fileType,
                fileName: attachment.fileName,
                fileSize: attachment.fileSize,
                link: attachment.link,
            });
            await this.attachmentRepository.save(newAttachment);
        }
    }
}