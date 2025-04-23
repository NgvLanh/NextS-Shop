import {
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from '../hooks/use-toast';
import { ProductType, VariantType } from '../lib/types';
import { formatCurrencyVND } from '../lib/utils';
import { ApiRequest, ApiResponse } from '../services/apiRequest';
import CartRate from './cart-rate';
import { Button } from './ui/button';

export default function ProductInfo({
  product,
  attributes,
  variants,
}: {
  product: ProductType;
  attributes: object;
  variants: VariantType[] | undefined;
}) {
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState<VariantType>({} as VariantType);
  const [selectedAttributes, setSelectedAttributes] = useState<{
    [key: string]: string;
  }>({});

  const router = useRouter();

  const handleSelectProduct = (key: string, value: string) => {
    const updated = { ...selectedAttributes, [key]: value };
    setSelectedAttributes(updated);

    const matched = variants?.find((variant) => {
      return Object.entries(updated).every(([attrKey, attrValue]) => {
        return variant.attributes[attrKey] === attrValue;
      });
    });

    setVariant(matched ?? ({} as VariantType));
  };

  const incrementQuantity = () => {
    if (quantity < variant.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = (variant: VariantType, quantity: number) => {
    const isLogin =
      localStorage.getItem('token') || sessionStorage.getItem('token') || false;
    if (isLogin) {
      addToCartServer(variant, quantity);
    } else {
      // addToCartLocal(variant, quantity);
      toast({
        title: 'Vui lòng đăng nhập',
        description: `Vui lòng đăng nhập để tiếp tục thêm vào giỏ hàng!`,
        variant: 'destructive',
      });
      router.push('/login');
    }
  };
  const addToCartServer = async (variant: VariantType, quantity: number) => {
    try {
      const result = await ApiRequest<ApiResponse>(`carts`, 'POST', {
        productId: variant.id,
        quantity,
      });
      if (result.success) {
        toast({
          title: 'Thành công',
          description: `Đã thêm ${quantity} ${product.name} vào giỏ hàng!`,
        });
      }
    } catch (error: any) {
      toast({
        title: 'Thất bại',
        description: error?.message,
        variant: 'destructive',
      });
    }
  };
  const addToCartLocal = (variant: VariantType, quantity: number) => {
    toast({
      title: 'Phát triển',
      description: `Chức năng thêm vào giỏ hàng khi chưa đăng nhập sẽ phát triển sau!`,
    });
    // const data = {
    //   id: variant.id,
    //   sku: variant.sku,
    //   price: variant.price,
    //   quantity,
    // };
    // const cartExits = localStorage.getItem('cart');
    // const cart = cartExits ? JSON.parse(cartExits) : [];

    // const index = cart.findIndex((item: any) => item.id === data.id);
    // if (cart[index].quantity >= variant.stock || quantity >= variant.stock) {
    //   toast({
    //     title: 'Vuợt số lượng',
    //     description: `Đã thêm ${product.name} vào giỏ hàng!`,
    //     variant: 'destructive',
    //   });
    //   return;
    // }
    // if (index !== -1) {
    //   cart[index].quantity += data.quantity;
    // } else {
    //   cart.push(data);
    // }
    // localStorage.setItem('cart', JSON.stringify(cart));
  };

  const handleAddToWishlist = (variant: VariantType) => {
    toast({
      title: 'Đang phát triển',
      description: 'Chức đăng phát triển sau ...!',
    });
  };

  const isAccept =
    Object.keys(selectedAttributes).length === Object.keys(attributes).length;

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-3xl font-bold'>{product?.name}</h1>
        <CartRate product={product} />
      </div>

      <div className='flex items-baseline gap-2'>
        <span className='text-2xl font-bold'>
          {isAccept
            ? formatCurrencyVND(variant.price)
            : formatCurrencyVND(product.basePrice ?? 0)}{' '}
        </span>
        {product?.discount && (
          <span className='text-lg text-muted-foreground line-through'>
            {formatCurrencyVND(product.discount)}
          </span>
        )}
        {product?.discount && (
          <span className='text-sm font-medium text-green-600'>
            Giảm {formatCurrencyVND(product.discount - variant.price)}
          </span>
        )}
      </div>

      <p className='text-muted-foreground'>{product?.description}</p>

      <div className='space-y-4'>
        {Object.entries(attributes).map(([key, values]) => (
          <div key={key}>
            <h3 className='font-medium mb-2 capitalize'>{key}</h3>
            <div className='flex gap-2'>
              {values.map((value: string) => {
                const tempSelected = {
                  ...selectedAttributes,
                  [key]: value,
                };

                const isAvailable = variants?.some((variant) =>
                  Object.entries(tempSelected).every(
                    ([attrKey, attrValue]) =>
                      variant.attributes[attrKey] === attrValue
                  )
                );

                return (
                  <div key={value}>
                    <input
                      type='radio'
                      id={`${key}-${value}`}
                      value={value}
                      name={key}
                      className='peer hidden'
                      disabled={!isAvailable}
                      onChange={(e) => {
                        handleSelectProduct(key, e.target.value);
                      }}
                    />
                    <label
                      htmlFor={`${key}-${value}`}
                      className={`border-2 rounded-md px-3 py-2 text-sm cursor-pointer select-none
                            ${
                              !isAvailable
                                ? 'opacity-30 cursor-not-allowed'
                                : ''
                            }
                              peer-checked:border-muted-foreground hover:border-muted-foreground`}
                    >
                      {value}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div>
          <h3 className='font-medium mb-2'>Số lượng</h3>
          <div className='flex items-center'>
            <Button
              variant='outline'
              size='icon'
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <Minus className='h-4 w-4' />
            </Button>
            <span className='w-12 text-center'>{quantity}</span>
            <Button
              variant='outline'
              size='icon'
              onClick={incrementQuantity}
              disabled={quantity >= variant.stock}
            >
              <Plus className='h-4 w-4' />
            </Button>
            <span className='ml-4 text-sm text-muted-foreground'>
              {(isAccept && variant.stock) || 0} hiện có
            </span>
          </div>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row gap-4 cursor-pointer'>
        <Button
          className={`flex-1 select-none`}
          size='lg'
          disabled={!isAccept}
          onClick={() => handleAddToCart(variant, quantity)}
        >
          <ShoppingCart className='mr-2 h-5 w-5' />
          Thêm vào giỏ hàng
        </Button>
        <Button
          variant='outline'
          className='select-none'
          size='lg'
          onClick={() => handleAddToWishlist(variant)}
        >
          <Heart className='mr-2 h-5 w-5' />
          Thêm vào yêu thích
        </Button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t'>
        <div className='flex items-center gap-2'>
          <Truck className='h-5 w-5 text-muted-foreground' />
          <span className='text-sm'>
            Miễn phí ship đơn {formatCurrencyVND(500000)}
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <RotateCcw className='h-5 w-5 text-muted-foreground' />
          <span className='text-sm'>Hoàn trả trong 7 ngày</span>
        </div>
        <div className='flex items-center gap-2'>
          <ShieldCheck className='h-5 w-5 text-muted-foreground' />
          <span className='text-sm'>Bảo hành 12 tháng</span>
        </div>
      </div>
    </div>
  );
}
