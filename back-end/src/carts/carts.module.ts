import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductVariant } from '../products/entities/product-variant.entity';
import { User } from '../users/entities/user.entity';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { CartItems } from './entities/cart-items.entity';
import { Cart } from './entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, CartItems, User, ProductVariant])],
  controllers: [CartsController],
  providers: [CartsService, JwtService],
})
export class CartsModule {}
