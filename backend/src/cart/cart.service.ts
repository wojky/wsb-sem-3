import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';
import { Cart } from './cart.entity';
import { MealsService } from 'src/meals/meals.service';
import { Meal } from 'src/meals/meal.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private mealsService: MealsService,
  ) {}

  async updateUserCart(mealId: number) {
    const userId = await Promise.resolve(0);
    const cart = await this.cartRepository.findOne({ where: { userId } });

    const currentMeal = await this.cartItemRepository.findOne({
      where: { mealId },
    });

    if (currentMeal) {
      return await this.cartItemRepository.save({
        id: currentMeal.id,
        quantity: currentMeal.quantity + 1,
      });
    } else {
      return await this.cartItemRepository.save({
        cartId: cart.id,
        createdAt: new Date().getTime(),
        quantity: 1,
        mealId,
      });
    }
  }

  async getUserCart(userId: number) {
    const cart = await this.cartRepository.findOne({ where: { userId } });

    if (!cart) {
      return null;
    }

    const items = await this.cartItemRepository.find({
      where: { cartId: cart.id },
    });

    if (items.length) {
      const menu = (await this.mealsService.getAll()).reduce(
        (menu, meal) => {
          return { ...menu, [meal.id]: meal };
        },
        {} as Record<number, Meal>,
      );

      return {
        cartId: cart.id,
        createdAt: cart.createdAt,
        items: items.map((item) => {
          const meal = menu[item.mealId];
          return {
            name: meal.name,
            quantity: item.quantity,
            mealId: item.mealId,
            id: item.id,
            price: meal.price,
            total: meal.price * item.quantity,
          };
        }),
      };
    } else {
      return {
        cartId: cart.id,
        createdAt: cart.createdAt,
        items: [],
      };
    }
  }
}
