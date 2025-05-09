import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Organization } from 'src/modules/organization/entities/organization.entity';
import { RestaurantTable } from 'src/modules/restaurant-table/entities/restaurant-table.entity';
import { User } from 'src/common/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

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
