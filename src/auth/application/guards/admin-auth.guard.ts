import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isAuthenticated = await super.canActivate(context);
        if (!isAuthenticated) {
            throw new UnauthorizedException('Authentication failed');
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (user && user.role === 'Admin') {
            return true;
        }

        throw new UnauthorizedException('Admin privileges required');
    }
}
