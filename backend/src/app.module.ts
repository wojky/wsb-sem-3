import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './meals/meal.entity';
import { MealHttpModule } from './meals/meal-http.module';
import { User } from './users/user.entity';
import { UsersHttpModule } from './users/users-http.module';
import { AuthHttpModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Meal, User],
      synchronize: true,
    }),
    MealHttpModule,
    UsersHttpModule,
    AuthHttpModule,
  ],
})
export class AppModule {}
