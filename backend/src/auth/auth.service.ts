import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,

    private jwtService: JwtService,
  ) {}

  async login(login: string, password: string) {
    const user = await this.userService.getByLogin(login);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    } else {
      const payload = {
        uuid: user.uuid,
        username: user.email,
        role: user.role,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }

  async logout() {}
}
