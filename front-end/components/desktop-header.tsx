'use client';

import { useCart } from '@/contexts/CartContext';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import { ApiRequest, ApiResponse } from '../services/apiRequest';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export default function DesktopHeader(auth: { auth: boolean }) {
  const { cartItems, setCartItems } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const result = await ApiRequest<ApiResponse>('carts', 'GET');
      setCartItems(result.data.cartItems);
    } catch (error) {
      console.error(error);
    }
  };

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className='hidden md:flex items-center justify-between w-full'>
      <div className='flex items-center gap-2'>
        <Link href='/' className='font-bold text-xl'>
          NextS
        </Link>
      </div>
      <div className='flex items-center gap-6'>
        <Link href='/' className='text-sm font-medium relative group'>
          Trang chủ
          <span className='absolute left-0 bottom-[-2px] w-0 h-[2px] bg-primary opacity-70 transition-all duration-300 group-hover:w-full'></span>
        </Link>
        <Link href='/products' className='text-sm font-medium relative group'>
          Sản phẩm
          <span className='absolute left-0 bottom-[-2px] w-0 h-[2px] bg-primary opacity-70 transition-all duration-300 group-hover:w-full'></span>
        </Link>
        <Link href='/categories' className='text-sm font-medium relative group'>
          Danh mục
          <span className='absolute left-0 bottom-[-2px] w-0 h-[2px] bg-primary opacity-70 transition-all duration-300 group-hover:w-full'></span>
        </Link>
        <Link href='/about' className='text-sm font-medium relative group'>
          Giới thiệu
          <span className='absolute left-0 bottom-[-2px] w-0 h-[2px] bg-primary opacity-70 transition-all duration-300 group-hover:w-full'></span>
        </Link>
        <Link href='/contact' className='text-sm font-medium relative group'>
          Liên hệ
          <span className='absolute left-0 bottom-[-2px] w-0 h-[2px] bg-primary opacity-70 transition-all duration-300 group-hover:w-full'></span>
        </Link>
      </div>
      <div className='flex items-center gap-4'>
        <Link href='/search'>
          <Heart className='h-5 w-5' />
        </Link>
        <Link href='/cart' className='relative mr-2'>
          <ShoppingCart className='h-5 w-5' />
          <Badge className='absolute -top-2 -right-4 scale-75'>
            {cartItemCount}
          </Badge>
        </Link>
        <Link href={auth.auth ? '/account' : '/login'}>
          <Button variant='outline' size='sm'>
            {auth.auth ? 'Tài khoản' : 'Đăng nhập'}
          </Button>
        </Link>
      </div>
    </div>
  );
}
