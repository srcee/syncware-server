import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantTableService } from './restaurant-table.service';

describe('RestaurantTableService', () => {
  let service: RestaurantTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantTableService],
    }).compile();

    service = module.get<RestaurantTableService>(RestaurantTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
