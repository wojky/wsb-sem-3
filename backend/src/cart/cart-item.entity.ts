import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'cart-items' })
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cartId: number;

  @Column()
  createdAt: number;

  @Column()
  mealId: number;

  @Column()
  quantity: number;
}
