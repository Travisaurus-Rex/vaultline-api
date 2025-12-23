import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { Role } from '../constants/roles';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['x-api-key'];

    if (!authHeader || !authHeader.startsWith('ApiKey ')) {
      throw new UnauthorizedException('Missing API key');
    }

    const apiKey = authHeader.replace('ApiKey ', '').trim();

    if (!apiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    // temp
    request.user = {
      id: 'api-client-id',
      roles: [Role.API],
      apiKey,
    };

    return true;
  }
}
