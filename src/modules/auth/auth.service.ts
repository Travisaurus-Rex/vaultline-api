import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from '../../common/constants/roles';
import { RefreshTokenStore } from './refresh-token.store';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  issueTokens(user: { id: string; roles: Role[] }) {
    const payload = {
      sub: user.id,
      roles: user.roles,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.config.get<string>('auth.jwtRefreshSecret'),
      expiresIn: '7d',
    });

    RefreshTokenStore.add(refreshToken);

    return { accessToken, refreshToken };
  }

  rotateRefreshToken(oldToken: string, user: { id: string; roles: Role[] }) {
    if (!RefreshTokenStore.has(oldToken)) {
      throw new UnauthorizedException('Refresh token revoked');
    }

    RefreshTokenStore.remove(oldToken);
    return this.issueTokens(user);
  }

  logout(refreshToken: string) {
    RefreshTokenStore.remove(refreshToken);
  }
}
