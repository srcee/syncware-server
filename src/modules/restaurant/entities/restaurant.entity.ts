import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Organization } from '../../organization/entities/organization.entity';
import { RestaurantTable } from '../../restaurant-table/entities/restaurant-table.entity';
import { User } from '../../../common/entities/user.entity';

@ObjectType()
@Entity()
export class Restaurant extends BaseEntity {
  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  location: string;

  @Field(() => Organization)
  @ManyToOne(() => Organization, (org) => org.restaurants)
  organization: Organization;

  @Field(() => [User])
  @OneToMany(() => User, (user) => user.restaurant)
  users: User[];

  @Field(() => [RestaurantTable])
  @OneToMany(() => RestaurantTable, (t) => t.restaurant)
  tables: RestaurantTable[];
}
