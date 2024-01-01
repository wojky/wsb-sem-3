import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meal } from './meal.entity';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private mealsRepository: Repository<Meal>,
  ) {}

  async getAll() {
    return this.mealsRepository.find();
  }

  async add(payload: Partial<Meal>) {
    return this.mealsRepository.save(payload);
  }

  async update(payload: { id: number } & Partial<Meal>) {
    return this.mealsRepository.save(payload);
  }

  async delete(mealId: number) {
    return this.mealsRepository.delete(mealId);
  }
}
