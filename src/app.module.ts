import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ClientModule } from './client/client.module';
import config from '../ormconfig';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule,
    ClientModule,
    ProductModule,
    OrderModule,
    ClientModule,
  ],
})
export class AppModule {}
