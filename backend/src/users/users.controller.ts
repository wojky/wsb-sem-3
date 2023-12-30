import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Role } from './role-type.enum';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  async getAll() {
    return this.usersService.getAll();
  }

  @Roles(Role.ADMIN)
  @Get(':uuid')
  async getById(@Param('uuid') uuid: string) {
    return this.usersService.getByUuid(uuid).then(({ password, ...user }) => {
      return user;
    });
  }

  @Roles(Role.ADMIN)
  @Post()
  async add(@Body() payload: { email: string; password: string }) {
    return this.usersService.create(payload);
  }
}
