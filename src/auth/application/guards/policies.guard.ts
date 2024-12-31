import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PolicyService } from '../services/policy.service';

@Injectable()
export class PoliciesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly policyService: PolicyService,
    ) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredPolicies = this.reflector.get<string[]>(
            'policies',
            context.getHandler(),
        );

        if (!requiredPolicies || requiredPolicies.length === 0) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user; // از JWT اطلاعات کاربر را می‌گیریم

        if (!this.policyService.validatePolicies(user, requiredPolicies)) {
            throw new ForbiddenException('Access denied: insufficient permissions');
        }

        return true;
    }
}
