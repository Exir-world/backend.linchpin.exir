import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Permission } from 'src/auth/domain/enums/permission.enum';
import { GetAllPermissionsQuery } from '../get-all-permissions.query';

type PermissionGroup = {
    group: string;
    groupLabel: string;
    permissions: {
        key: Permission;
        label: string;
    }[];
};

const groupedPermission: PermissionGroup[] = [
    {
        group: 'role',
        groupLabel: 'نقش',
        permissions: [
            { key: Permission.CreateRole, label: 'ایجاد' },
            { key: Permission.ReadRole, label: 'مشاهده' },
            { key: Permission.UpdateRole, label: 'ویرایش' },
            { key: Permission.DeleteRole, label: 'حذف' },
        ],
    },
];

@QueryHandler(GetAllPermissionsQuery)
export class GetAllPermissionHandler
    implements IQueryHandler<GetAllPermissionsQuery> {
    async execute(): Promise<PermissionGroup[]> {
        return groupedPermission;
    }
}
