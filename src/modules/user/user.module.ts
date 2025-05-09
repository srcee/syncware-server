import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../common/entities/user.entity';
import { PasswordModule } from 'src/modules/password/password.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PasswordModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
