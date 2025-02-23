import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { NotificationTypeEnum } from 'src/notifications/domain/enums/notification-type.enum';

export class CreateNotificationDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ enum: NotificationTypeEnum, example: NotificationTypeEnum.SYSTEM })
    @IsEnum(NotificationTypeEnum)
    @IsNotEmpty()
    type: NotificationTypeEnum;

    @ApiProperty({ example: 'New Message Received' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'You have received a new message.' })
    @IsString()
    @IsNotEmpty()
    description: string;
}
