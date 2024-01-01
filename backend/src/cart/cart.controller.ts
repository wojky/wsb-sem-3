import { Body, Controller, Get, Post } from '@nestjs/common';
import { Role } from 'src/users/role-type.enum';
import { Roles } from 'src/users/roles.decorator';
import { CartService } from './cart.service';

@Controller()
export class CartController {
  constructor(private cartService: CartService) {}

  @Roles(Role.CUSTOMER)
  @Get('cart')
  async getUserCart() {}

  @Roles(Role.CUSTOMER)
  @Post('cart')
  async updateUserCart(@Body('mealId') mealId: number) {
    return this.cartService.updateUserCart(mealId);
  }

  @Roles(Role.CUSTOMER)
  @Post('orders')
  async orderMeal() {}

  @Roles(Role.ADMIN)
  @Get('orders')
  async getAllOrders() {}
}
