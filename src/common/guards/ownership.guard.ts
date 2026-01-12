import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class OwnershipGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const userId = req.user?.id;
    const ownerId = req.params?.id;

    if (!userId || !ownerId) {
      throw new ForbiddenException('Ownership cannot be determined');
    }

    if (userId !== ownerId) {
      throw new ForbiddenException('You do not own this resource');
    }

    return true;
  }
}
