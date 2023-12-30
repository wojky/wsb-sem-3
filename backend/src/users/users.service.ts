import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll() {
    return (await this.usersRepository.find()).map(({ password, ...user }) => {
      return user;
    });
  }

  async getByUuid(uuid: string) {
    return this.usersRepository.findOne({ where: { uuid } });
  }

  async getByLogin(login: string) {
    console.log(login);
    return this.usersRepository.findOne({ where: { email: login } });
  }

  async create(payload: Pick<User, 'email' | 'password'>) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(payload.password, saltOrRounds);

    return this.usersRepository
      .save({
        email: payload.email,
        password: hash,
      })
      .then(({ password, ...user }) => {
        return user;
      });
  }
}
