import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from '../../common/decorators/roles.decorator';
import { GqlContext } from '../../modules/auth/auth.resolver';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const gqlContext = GqlExecutionContext.create(context);
    const { user } = gqlContext.getContext<GqlContext>().req;

    return !!user && requiredRoles.includes(user.role);
  }
}
