import { Injectable } from '@nestjs/common';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(input: CreateOrderInput): Promise<Order> {
    const order = this.orderRepository.create(input);

    return this.orderRepository.save(order);
  }

  async findOne(id: number): Promise<Order | null> {
    return this.orderRepository.findOne({ where: { id } });
  }

  async update(id: number, input: UpdateOrderInput): Promise<Order | null> {
    const order = await this.findOne(id);

    if (!order) {
      return null;
    }

    Object.assign(order, input);

    return await this.orderRepository.save(order);
  }

  async delete(id: number): Promise<boolean> {
    const order = await this.findOne(id);

    if (!order) {
      throw new Error('Menu Item does not exist');
    }

    await this.orderRepository.delete(id);

    return true;
  }
}
