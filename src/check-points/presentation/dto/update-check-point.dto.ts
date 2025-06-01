import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckPointDto } from './create-check-point.dto';

export class UpdateCheckPointDto extends PartialType(CreateCheckPointDto) { }
