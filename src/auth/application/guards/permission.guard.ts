import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from 'src/auth/domain/enums/permission.enum';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(PERMISSIONS_KEY, [
            context.getHandler(),
            context.getClass(),
        ]) || [];

        const request = context.switchToHttp().getRequest();
        const user = request.user; // از توکن jwt می‌آید

        if (!user) {
            throw new ForbiddenException('User not authenticated');
        }

        if (!requiredPermissions.length) {
            // یعنی اصلاً permission خاصی تعیین نشده → فقط احراز هویت کفایت می‌کند
            return true;
        }

        const userPermissions: Permission[] = user.permissions || [];

        const hasAllPermissions = requiredPermissions.every((permission) =>
            userPermissions.includes(permission)
        );

        if (!hasAllPermissions) {
            throw new ForbiddenException('Insufficient permissions');
        }

        return true;
    }
}
