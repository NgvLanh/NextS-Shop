import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from '../../configs/api-response';
import { ProductVariant } from '../products/entities/product-variant.entity';
import { User } from '../users/entities/user.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartItems } from './entities/cart-items.entity';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItems)
    private readonly itemstRepository: Repository<CartItems>,
    @InjectRepository(ProductVariant)
    private readonly varianttRepository: Repository<ProductVariant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createCartDto: CreateCartDto, req) {
    const userId = req.user?.sub;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException(
        ApiResponse.notFound('Không tìm thấy người dùng!'),
        404,
      );
    }

    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
    });

    const variant = await this.varianttRepository.findOneBy({
      id: createCartDto.productId,
    });

    const cartItems = {
      cart: cart,
      variant: variant,
      quantity: createCartDto.quantity,
    };

    const items = await this.itemstRepository.findOne({
      relations: { cart: true, variant: true },
      where: { cart: { id: cart.id }, variant: { id: variant.id } },
    });

    if (createCartDto.quantity > variant.stock) {
      throw new HttpException(
        ApiResponse.error('Số lượng thêm vượt quá số lượng trong kho!'),
        400,
      );
    }

    if (items) {
      items.quantity += createCartDto.quantity;
      await this.itemstRepository.save(items);
    } else {
      await this.itemstRepository.save(cartItems);
    }

    return ApiResponse.success(
      'Thêm sản phẩm vào giỏ hàng thành công!',
      items || cartItems,
    );
  }

  async findOne(req) {
    const userId = req.user?.sub;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException(
        ApiResponse.notFound('Không tìm thấy người dùng!'),
        404,
      );
    }
    const cart = await this.cartRepository.findOne({
      relations: { cartItems: { variant: { product: true } } },
      where: { user: { id: userId } },
    });
    return ApiResponse.success('Lấy thông tin giỏ hàng thành công!', cart);
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    const method = updateCartDto.method;
    if (method === 'DELETE') {
      await this.itemstRepository.delete({ id: id });
      return ApiResponse.success(`Xoá sản phẩm trong giỏ hàng thành công!`);
    } else if (method === 'PATCH') {
      const cartItems = await this.itemstRepository.findOneBy({ id: id });
      cartItems.quantity = updateCartDto.quantity;
      await this.itemstRepository.save(cartItems);
      return ApiResponse.success(
        `Cập nhật số lượng sản phẩm thành công!`,
        cartItems,
      );
    } else {
      throw new HttpException(
        ApiResponse.error(`Phương thức không hợp lệ!`),
        400,
      );
    }
  }
}
