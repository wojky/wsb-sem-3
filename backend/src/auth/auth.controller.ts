import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './Public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() payload: { email: string; password: string }) {
    return this.authService.login(payload.email, payload.password);
  }

  @Post('logout')
  async logout() {}
}
