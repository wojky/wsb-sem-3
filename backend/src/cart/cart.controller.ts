import { Body, Controller, Get, Post } from '@nestjs/common';
import { Role } from 'src/users/role-type.enum';
import { Roles } from 'src/users/roles.decorator';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Roles(Role.CUSTOMER)
  @Get()
  async getUserCart() {
    // return this.cartService.getUserCart();
  }

  @Roles(Role.CUSTOMER)
  @Post()
  async updateUserCart(@Body('mealId') mealId: number) {
    return this.cartService.updateUserCart(mealId);
  }
}
