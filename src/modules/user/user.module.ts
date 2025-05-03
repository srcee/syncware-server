import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PasswordModule } from 'src/password/password.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PasswordModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
