import { Test, TestingModule } from '@nestjs/testing';
import { MenuCategoryResolver } from './menu-category.resolver';
import { MenuCategoryService } from './menu-category.service';

describe('MenuCategoryResolver', () => {
  let resolver: MenuCategoryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuCategoryResolver, MenuCategoryService],
    }).compile();

    resolver = module.get<MenuCategoryResolver>(MenuCategoryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
