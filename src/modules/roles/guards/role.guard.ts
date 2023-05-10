import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {

    const request = context.switchToHttp().getRequest();
    const { user } = request;

    if(user.rol.id === 1) {
      return true
    }

    return false
  }
}