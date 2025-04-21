import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductAttributeOption } from './product-attribute-option.entity';

@Entity('product_attributes')
export class ProductAttribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'is_variant' })
  isVariant: boolean;

  @OneToMany(() => ProductAttribute, (attribute) => attribute.options)
  @JoinColumn({ name: 'attribute_id' })
  options: ProductAttributeOption[];
}
