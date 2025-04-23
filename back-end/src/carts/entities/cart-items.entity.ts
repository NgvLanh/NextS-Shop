import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductVariant } from '../../products/entities/product-variant.entity';
import { Cart } from './cart.entity';

@Entity('cart_items')
export class CartItems {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @ManyToOne(() => ProductVariant, (variant) => variant.cartItems)
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant;
}
