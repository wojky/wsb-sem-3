import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { MealType } from './meal-type.enum';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  ingredients: string;

  @Column({ default: MealType.Meat })
  type: MealType;
}
