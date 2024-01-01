import { Test, TestingModule } from '@nestjs/testing';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { Meal } from './meal.entity';
import { MealType } from './meal-type.enum';

describe('MealsController', () => {
  let controller: MealsController;
  let service: MealsService;

  beforeEach(async () => {
    const mockMealsService = { getAll: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealsController],
      providers: [{ provide: MealsService, useValue: mockMealsService }],
    }).compile();

    controller = module.get<MealsController>(MealsController);
    service = module.get<MealsService>(MealsService);
  });

  it('should return an array of meals', async () => {
    const result: Meal[] = [
      {
        id: 1,
        name: 'Meal 1',
        ingredients: '["Ingredient 1", "Ingredient 2"]',
        price: 1000,
        type: MealType.Meat,
      },
    ];

    jest.spyOn(service, 'getAll').mockReturnValue(Promise.resolve(result));

    const exp = await controller.getAll();

    expect(exp).toEqual([
      {
        ...result[0],
        ingredients: ['Ingredient 1', 'Ingredient 2'],
      },
    ]);
  });
});
