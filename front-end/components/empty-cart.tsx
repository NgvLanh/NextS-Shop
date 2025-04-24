import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export default function EmptyCart() {
  return (
    <div className='text-center py-12'>
      <div className='mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-muted mb-6'>
        <ShoppingCart className='h-12 w-12 text-muted-foreground' />
      </div>
      <h2 className='text-xl font-medium mb-2'>Giỏ hàng rỗng</h2>
      <p className='text-muted-foreground mb-6'>
        Bạn chưa có sản phẩm nào trong giỏ hàng!
      </p>
      <Link href='/products'>
        <Button>Tiếp tục mua sắm</Button>
      </Link>
    </div>
  );
}
