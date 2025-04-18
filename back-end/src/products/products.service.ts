import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from '../../configs/api-response';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from './entities/category.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(ProductVariant)
    private readonly variantRepository: Repository<ProductVariant>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

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

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
