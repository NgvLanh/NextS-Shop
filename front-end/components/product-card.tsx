import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductType } from '../lib/types';
import { formatCurrencyVND } from '../lib/utils';
import { Button } from './ui/button';

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <Link href={`/products/${product.id}`} key={product.id} className='group'>
      <div className='overflow-hidden rounded-lg border bg-background'>
        <div className='relative aspect-square overflow-hidden'>
          <Image
            src={`${
              product.imageUrl
                ? product.imageUrl
                : `/placeholder.svg?height=400&width=400&text=Product+${product.name}`
            }`}
            width={500}
            height={500}
            alt={`Product ${product.name}`}
            className='object-cover w-full h-full transition-transform group-hover:scale-105'
          />
          <div className='absolute top-2 right-2'>
            <Button
              size='icon'
              variant='ghost'
              className='h-8 w-8 rounded-full bg-white'
            >
              <Heart className='h-4 w-4' />
              <span className='sr-only'>Add to wishlist</span>
            </Button>
          </div>
        </div>
        <div className='p-4'>
          <h3 className='font-medium'>{product.name}</h3>
          <p className='text-sm text-muted-foreground'>
            {product.category?.name}
          </p>
          <div className='mt-2 flex items-center justify-between'>
            <span className='font-medium'>
              {formatCurrencyVND(product.basePrice ?? 0)}

              {product.price &&
                `${' - '} ${formatCurrencyVND(product.price ?? 0)}`}
            </span>
            <Button size='sm' variant='secondary'>
              <ShoppingCart className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
