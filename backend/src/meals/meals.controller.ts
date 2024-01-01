import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { MealsService } from './meals.service';
import { Meal } from './meal.entity';

import { Public } from '../auth/Public.decorator';
import { Role } from '../users/role-type.enum';
import { Roles } from '../users/roles.decorator';

@Controller('meals')
export class MealsController {
  constructor(private mealsService: MealsService) {}

  @Public()
  @Get()
  async getAll() {
    const response = await this.mealsService.getAll();

    return response.map((meal) => {
      try {
        return { ...meal, ingredients: JSON.parse(meal.ingredients) };
      } catch (e) {
        console.log('?', meal.name);
        return meal;
      }
    });
  }

  @Roles(Role.ADMIN)
  @Post()
  add(@Body() payload: Omit<Meal, 'id'>) {
    return this.mealsService.add({
      ...payload,
      ingredients: JSON.stringify(payload.ingredients),
    });
  }

  @Roles(Role.ADMIN)
  @Patch(':mealId')
  update(
    @Param('mealId', ParseIntPipe) mealId: number,
    @Body() payload: Partial<Meal>,
  ) {
    if (payload.ingredients) {
      payload.ingredients = JSON.stringify(payload.ingredients);
    }

    return this.mealsService.update({ ...payload, id: mealId });
  }

  @Roles(Role.ADMIN)
  @Delete(':mealId')
  delete(@Param('mealId') mealId: string) {
    return this.mealsService.delete(+mealId);
  }
}
