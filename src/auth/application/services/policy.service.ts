import { Injectable } from '@nestjs/common';
@Injectable()
export class PolicyService {
  validatePolicies(user: any, requiredPolicies: string[]): boolean {
    if (!user || !user.permissions) {
      return false;
    }
    return requiredPolicies.every(policy => user.permissions.includes(policy));
  }

  validateRoles(user: any, requiredRoles: string[]): boolean {
    if (!user || !user.role) {
      return false;
    }
    return requiredRoles.includes(user.role);
  }
}
