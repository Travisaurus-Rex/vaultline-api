import { Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('login')
  login() {
    return { message: 'login placeholder' };
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  refresh(@User() user: any) {
    return { message: 'refresh placeholder' };
  }
}
