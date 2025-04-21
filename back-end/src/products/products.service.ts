import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from '../../configs/api-response';
import { Category } from '../categories/entities/category.entity';
import { ProductAttributeOption } from './entities/product-attribute-option.entity';
import { ProductAttribute } from './entities/product-attribute.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { Product } from './entities/product.entity';
import { VariantAttribute } from './entities/variant_attribute.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(ProductVariant)
    private readonly variantRepository: Repository<ProductVariant>,
    @InjectRepository(ProductAttribute)
    private readonly attributeRepository: Repository<ProductAttribute>,
    @InjectRepository(ProductAttributeOption)
    private readonly optionRepository: Repository<ProductAttributeOption>,
    @InjectRepository(VariantAttribute)
    private readonly variantAttributeRepository: Repository<VariantAttribute>,
  ) {}

  async findAll() {
    const products = await this.productRepository.find({
      where: { isActive: true },
      relations: { variants: true, category: true },
      order: { id: 'ASC' },
    });
    const data = products.map((product) => {
      const firstVariant = product.variants[0];
      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description,
        basePrice: product.basePrice,
        imageUrl: firstVariant?.imageUrl || null,
        price: firstVariant?.price || null,
        createdAt: product.createdAt,
        category: product.category
          ? { id: product.category.id, name: product.category.name }
          : null,
        variants: product.variants.map((v) => ({
          id: v.id,
          sku: v.sku,
          price: v.price,
        })),
      };
    });

    return ApiResponse.success('Lấy danh sách sản phẩm thành công!', data);
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        variants: {
          variantAttributes: {
            option: {
              attribute: true,
            },
          },
        },
        category: true,
      },
    });

    if (!product) {
      return ApiResponse.error('Không tìm thấy sản phẩm!');
    }

    const attributesMap = {};
    const images = [];

    const cleanVariants = product.variants.map((variant) => {
      const attrs = {};
      variant.variantAttributes.forEach((attr) => {
        const attrName = attr.option.attribute.name.toLowerCase();
        const attrValue = attr.option.value;

        if (!attributesMap[attrName]) attributesMap[attrName] = new Set();
        attributesMap[attrName].add(attrValue);
        attrs[attrName] = attrValue;
      });

      if (variant.imageUrl) images.push(variant.imageUrl);
      return {
        id: variant.id,
        sku: variant.sku,
        price: Number(variant.price),
        stock: variant.stock,
        attributes: attrs,
      };
    });

    const attributes = {};
    for (const key in attributesMap) {
      attributes[key] = Array.from(attributesMap[key]);
    }

    const result = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      basePrice: Number(product.basePrice),
      images,
      category: {
        id: product.category.id,
        name: product.category.name,
      },
      variants: cleanVariants,
      attributes,
      discount: null,
    };

    return ApiResponse.success('Lấy sản phẩm thành công!', result);
  }
}
