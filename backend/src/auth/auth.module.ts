import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersHttpModule } from 'src/users/users-http.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANTS } from './JWT_CONSTANTS';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  imports: [
    UsersHttpModule,
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANTS.SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  exports: [AuthService],
})
export class AuthHttpModule {}
