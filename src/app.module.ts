import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLISODateTime, GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrganizationModule } from './modules/organization/organization.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { RestaurantTableModule } from './modules/restaurant-table/restaurant-table.module';
import { OrderModule } from './modules/order/order.module';
import { OrderItemModule } from './modules/order-item/order-item.module';
import { MenuItemModule } from './modules/menu-item/menu-item.module';
import { MenuCategoryModule } from './modules/menu-category/menu-category.module';
import { PasswordModule } from './modules/password/password.module';
import { AuthModule } from './modules/auth/auth.module';
import * as Joi from 'joi';
import { CoreModule } from './core/core.module';

const validationSchema = Joi.object({
  JWT_SECRET: Joi.string().min(9).required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  HASH_ROUNDS: Joi.number().default(10),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
});

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema,
    }),
    // Infrastructure Modules
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./src/**/*.graphql'],
      context: ({ req }: { req: Request }) => ({ req }),
      definitions: {
        path: join(process.cwd(), 'src/graphql/graphql.ts'),
      },
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: +config.get<number>('POSTGRES_PORT', 5432),
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DB'),
        entities: [__dirname + '/../modules/**/*.entity.{ts,js}'],
        migrations: [__dirname + '/../migrations/*.{ts,js}'],
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    // Business Logic Modules
    UserModule,
    OrganizationModule,
    RestaurantModule,
    RestaurantTableModule,
    OrderModule,
    OrderItemModule,
    MenuItemModule,
    MenuCategoryModule,
    PasswordModule,
    AuthModule,
  ],
  providers: [
    {
      provide: 'Date',
      useValue: GraphQLISODateTime,
    },
  ],
})
export class AppModule {}
