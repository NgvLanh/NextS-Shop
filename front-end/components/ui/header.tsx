'use client';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from '../../hooks/use-toast';
import { verifyToken } from '../../services/authService';
import { Button } from './button';

export default function Header() {
  const [isAuth, setIsAuth] = useState(false);
  const route = useRouter();

  useEffect(() => {
    const verify = async () => {
      try {
        const result = await verifyToken();
        setIsAuth(result.success);
      } catch (error) {
        toast({
          title: 'Phiên phản hết hạn',
          description: 'Vui lòng đăng nhập lại để tiếp tục!',
          variant: 'destructive',
        });
        setIsAuth(false);
        route.push('/login');
      }
    };
    verify();
  }, []);
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background'>
      <div className='container mx-auto flex h-16 items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='/' className='font-bold text-xl'>
            NextS
          </Link>
        </div>
        <div className='hidden md:flex items-center gap-6'>
          <Link href='/' className='text-sm font-medium'>
            Trang chủ
          </Link>
          <Link href='/products' className='text-sm font-medium'>
            Sản phẩm
          </Link>
          <Link href='/categories' className='text-sm font-medium'>
            Danh mục
          </Link>
          <Link href='/about' className='text-sm font-medium'>
            Giới thiệu
          </Link>
          <Link href='/contact' className='text-sm font-medium'>
            Liên hệ
          </Link>
        </div>
        <div className='flex items-center gap-4'>
          <Link href='/search'>
            <Button variant='ghost' size='icon'>
              <Heart className='h-5 w-5' />
              <span className='sr-only'>Danh sách yêu thích</span>
            </Button>
          </Link>
          <Link href='/cart' className='relative'>
            <Button variant='ghost' size='icon'>
              <ShoppingCart className='h-5 w-5' />
              <span className='sr-only'>Giỏ hàng</span>
              <span className='absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center'>
                3
              </span>
            </Button>
          </Link>
          <Link href={isAuth ? '/account' : '/login'}>
            <Button variant='outline' size='sm'>
              {isAuth ? 'Tài khoản' : 'Đăng nhập'}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
