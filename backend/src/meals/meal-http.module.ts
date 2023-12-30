import { Module } from '@nestjs/common';
import { MealsController } from './meals.controller';
import { MealsModule } from './meals.module';
import { MealsService } from './meals.service';

@Module({
  imports: [MealsModule],
  providers: [MealsService],
  controllers: [MealsController],
})
export class MealHttpModule {}
