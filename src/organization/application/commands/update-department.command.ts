import { ICommand } from '@nestjs/cqrs';
import { UpdateDepartmentDto } from 'src/organization/presentation/dto/update-department.dto';

export class UpdateDepartmentCommand implements ICommand {
    constructor(
        public readonly id: number,
        public readonly updateDepartmentDto: UpdateDepartmentDto,
    ) { }
}
