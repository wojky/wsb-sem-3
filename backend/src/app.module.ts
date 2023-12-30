import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './meals/meal.entity';
import { MealHttpModule } from './meals/meal-http.module';
import { User } from './users/user.entity';
import { UsersHttpModule } from './users/users-http.module';
import { AuthHttpModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'wsb_app',
      entities: [Meal, User],
      synchronize: true,
    }),
    MealHttpModule,
    UsersHttpModule,
    AuthHttpModule,
  ],
})
export class AppModule {}
