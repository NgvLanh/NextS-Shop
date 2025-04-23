import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartItems } from '../../carts/entities/cart-items.entity';
import { Product } from './product.entity';
import { VariantAttribute } from './variant_attribute.entity';

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sku: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  price: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(
    () => VariantAttribute,
    (variantAttribute) => variantAttribute.variant,
  )
  variantAttributes: VariantAttribute[];

  @OneToMany(() => CartItems, (cartItems) => cartItems.variant)
  cartItems: CartItems[];
}
