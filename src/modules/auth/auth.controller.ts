import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Post('login')
  login() {
    return { message: 'login placeholder' };
  }

  @Post('refresh')
  refresh() {
    return { message: 'refresh placeholder' };
  }
}
