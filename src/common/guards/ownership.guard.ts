import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.id) {
      throw new ForbiddenException('Missing authenticated user');
    }

    // temp
    const ownerId =
      request.params?.userId || request.body?.userId || request.resourceOwnerId;

    if (!ownerId) {
      throw new ForbiddenException('User does not own this resource');
    }

    return true;
  }
}
