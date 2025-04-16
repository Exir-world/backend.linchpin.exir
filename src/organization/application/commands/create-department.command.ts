import { ICommand } from '@nestjs/cqrs';
import { CreateDepartmentDto } from 'src/organization/presentation/dto/create-department.dto';

export class CreateDepartmentCommand implements ICommand {
    constructor(
        public readonly createDepartmentDto: CreateDepartmentDto,
    ) { }
}
