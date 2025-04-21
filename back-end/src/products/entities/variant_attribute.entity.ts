import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ProductAttributeOption } from './product-attribute-option.entity';
import { ProductVariant } from './product-variant.entity';

@Entity('variant_attributes')
export class VariantAttribute {
  @PrimaryColumn()
  variant_id: number;

  @PrimaryColumn()
  option_id: number;

  @ManyToOne(() => ProductVariant, (variant) => variant.variantAttributes)
  @JoinColumn({ name: 'variant_id' })
  variant: ProductVariant;

  @ManyToOne(() => ProductAttributeOption, (option) => option.variantAttributes)
  @JoinColumn({ name: 'option_id' })
  option: ProductAttributeOption;
}
