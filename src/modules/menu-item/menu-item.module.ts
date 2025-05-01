import { Module } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { MenuItemResolver } from './menu-item.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from './entities/menu-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItem])],
  providers: [MenuItemResolver, MenuItemService],
})
export class MenuItemModule {}
