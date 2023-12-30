import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role-type.enum';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ generated: 'uuid' })
  uuid: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: Role.CUSTOMER })
  role: Role;
}
