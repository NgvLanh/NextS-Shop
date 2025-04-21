import Link from 'next/link';
import { ProductType } from '../lib/types';

export default function CartBreakcrumbs({ product }: { product: ProductType }) {
  return (
    <div className='flex items-center gap-1 text-sm mb-6'>
      <Link href='/' className='text-muted-foreground hover:text-foreground'>
        Trang chủ
      </Link>
      <span className='text-muted-foreground'>/</span>
      <Link
        href='/products'
        className='text-muted-foreground hover:text-foreground'
      >
        Sản phẩm
      </Link>
      <span className='text-muted-foreground'>/</span>
      <span>{product.name}</span>
    </div>
  );
}
