import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  createdAt: number;
}
