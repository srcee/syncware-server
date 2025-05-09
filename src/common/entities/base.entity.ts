import { Field, ID } from '@nestjs/graphql';
import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { RequestContext } from '../context/request-context.service';
import { User } from 'src/common/entities/user.entity';

export abstract class BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  @Field(() => User, { nullable: true })
  createdBy: User;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'updated_by' })
  @Field(() => User, { nullable: true })
  updatedBy: User;

  @Field()
  @Column({ default: false })
  archived: boolean;

  @BeforeInsert()
  setCreatedBy() {
    const user = RequestContext.getUser();
    if (user) {
      this.createdBy = user;
    }
  }

  @BeforeUpdate()
  setUpdatedBy() {
    const user = RequestContext.getUser();
    if (user) {
      this.updatedBy = user;
    }
  }
}
