import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductAttribute } from './product-attribute.entity';

@Entity('product_attribute_options')
export class ProductAttributeOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column({ name: 'hex_color' })
  hexColor: string;

  @Column({ name: 'image_url' })
  imageUrl: string;

  @ManyToOne(() => ProductAttribute, (attribute) => attribute.options)
  @JoinColumn({ name: 'attribute_id' })
  attribute: ProductAttribute;

  @OneToMany(() => ProductAttributeOption, (option) => option.attribute)
  variantAttributes: ProductAttributeOption[];
}
