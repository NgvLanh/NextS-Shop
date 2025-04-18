import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_variants')
export class ProductVariant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sku: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  price: number;

  @Column({ default: 0 })
  inventory: number;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @ManyToOne(() => Product, (product) => product.variants)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
