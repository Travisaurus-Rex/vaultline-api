import { Controller, Post, UseGuards } from '@nestjs/common';
import { Role } from 'src/common/constants/roles';
import { User } from 'src/common/decorators/user.decorator';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
import { AuthService } from './auth.service';

type User = {
  id: string;
  roles: Role[];
};

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login() {
    const user = { id: 'user123', roles: [Role.USER] };
    return this.authService.issueTokens(user);
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  refresh(@User() user: User) {
    return this.authService.issueTokens(user);
  }
}
