import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenStore } from '../../modules/auth/refresh-token.store';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.body?.refreshToken;

    if (!token) {
      throw new UnauthorizedException('Missing refresh token');
    }

    if (!RefreshTokenStore.has(token)) {
      throw new UnauthorizedException('Refresh token revoked');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.config.get<string>('auth.jwtRefreshSecret'),
      });

      request.user = {
        id: payload.sub,
        roles: payload.roles,
      };

      request.refreshToken = token;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
