import { Menu, ShoppingCart, X } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { Badge } from './ui/badge';
type HeaderProps = {
  auth: boolean;
  cartItemCount: number;
};
export default function MobileHeader({ auth, cartItemCount }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='md:hidden flex items-center justify-between w-full mx-4'>
      <Link href='/' className='font-bold text-xl'>
        NextS
      </Link>
      <div className='flex items-center space-x-1'>
        <Link href='/cart' className='relative mr-2'>
          <ShoppingCart className='h-5 w-5' />
          <Badge className='absolute -top-2 -right-4 scale-75'>
            {cartItemCount}
          </Badge>
        </Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='p-2 hover:bg-gray-200 rounded-full transition duration-300'
        >
          {isMenuOpen ? (
            <X className='h-6 w-6' />
          ) : (
            <Menu className='h-6 w-6' />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300'
            onClick={() => setIsMenuOpen(false)}
          ></motion.div>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className='fixed top-0 right-0 h-full w-3/4 bg-background shadow-lg z-50 transition-transform duration-100'
          >
            <div className='flex flex-col p-4'>
              <button
                onClick={() => setIsMenuOpen(false)}
                className='self-end p-2 hover:bg-gray-200 rounded-full transition duration-300'
              >
                <X className='h-6 w-6' />
              </button>
              <Link
                href='/'
                className='py-2 text-sm font-medium relative group'
              >
                Trang chủ
                <span className='absolute left-0 bottom-[-2px] w-0 h-[2px] bg-primary opacity-70 transition-all duration-300 group-hover:w-full'></span>
              </Link>
              <Link
                href='/products'
                className='py-2 text-sm font-medium relative group'
              >
                Sản phẩm
                <span className='absolute left-0 bottom-[-2px] w-0 h-[2px] bg-primary opacity-70 transition-all duration-300 group-hover:w-full'></span>
              </Link>
              <Link
                href='/categories'
                className='py-2 text-sm font-medium relative group'
              >
                Danh mục
                <span className='absolute left-0 bottom-[-2px] w-0 h-[2px] bg-primary opacity-70 transition-all duration-300 group-hover:w-full'></span>
              </Link>
              <Link
                href='/about'
                className='py-2 text-sm font-medium relative group'
              >
                Giới thiệu
                <span className='absolute left-0 bottom-[-2px] w-0 h-[2px] bg-primary opacity-70 transition-all duration-300 group-hover:w-full'></span>
              </Link>
              <Link
                href='/contact'
                className='py-2 text-sm font-medium relative group'
              >
                Liên hệ
                <span className='absolute left-0 bottom-[-2px] w-0 h-[2px] bg-primary opacity-70 transition-all duration-300 group-hover:w-full'></span>
              </Link>
              <Link
                href={auth ? '/account' : '/login'}
                className='py-2 text-sm font-medium relative group'
              >
                {auth ? 'Tài khoản' : 'Đăng nhập'}
                <span className='absolute left-0 bottom-[-2px] w-0 h-[2px] bg-primary opacity-70 transition-all duration-300 group-hover:w-full'></span>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
