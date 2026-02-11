import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const resourceOwnerID = req.user?.id;
    const authenticatedUser = req.user;

    if (!authenticatedUser?.id) {
      throw new UnauthorizedException('User not authenticated');
    }

    if (resourceOwnerID !== authenticatedUser.id) {
      throw new ForbiddenException('Cannot access this resource');
    }

    return true;
  }
}
