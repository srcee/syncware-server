import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from './base.entity';
import { Restaurant } from '../../modules/restaurant/entities/restaurant.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum UserRole {
  Admin = 'admin',
  Manager = 'manager',
  Waiter = 'waiter',
  Chef = 'chef',
  Bartender = 'bartender',
}

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Field()
  @Column()
  username: string;

  @Field(() => UserRole)
  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, (r) => r.users)
  restaurant: Restaurant;
}
