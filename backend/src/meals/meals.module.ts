import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from './meal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Meal])],
  exports: [TypeOrmModule],
})
export class MealsModule {}
