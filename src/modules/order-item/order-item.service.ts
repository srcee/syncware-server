import { Injectable } from '@nestjs/common';
import { CreateOrderItemInput } from './dto/create-order-item.input';
import { UpdateOrderItemInput } from './dto/update-order-item.input';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async create(input: CreateOrderItemInput): Promise<OrderItem> {
    const orderItem = this.orderItemRepository.create(input);

    return this.orderItemRepository.save(orderItem);
  }

  async findOne(id: number): Promise<OrderItem | null> {
    return this.orderItemRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    input: UpdateOrderItemInput,
  ): Promise<OrderItem | null> {
    const orderItem = await this.findOne(id);

    if (!orderItem) {
      return null;
    }

    Object.assign(orderItem, input);

    return await this.orderItemRepository.save(orderItem);
  }

  async delete(id: number): Promise<boolean> {
    const orderItem = await this.findOne(id);

    if (!orderItem) {
      throw new Error('Menu Item does not exist');
    }

    await this.orderItemRepository.delete(id);

    return true;
  }
}
