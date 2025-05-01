import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantTableResolver } from './restaurant-table.resolver';
import { RestaurantTableService } from './restaurant-table.service';

describe('RestaurantTableResolver', () => {
  let resolver: RestaurantTableResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantTableResolver, RestaurantTableService],
    }).compile();

    resolver = module.get<RestaurantTableResolver>(RestaurantTableResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
