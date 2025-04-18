'use client';
import { Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ProductType } from '../lib/types';
import { formatCurrencyVND } from '../lib/utils';
import { ApiRequest, ApiResponse } from '../services/apiRequest';
import { Button } from './ui/button';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const limitStep = 4;
  const [limit, setLimit] = useState<number>(4);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await ApiRequest<ApiResponse>('products', 'GET');
        console.log(result.data);
        setProducts(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className='w-full py-12 md:py-24'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
              Sản phẩm nổi bật
            </h2>
            <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              Khám phá bộ sưu tập các sản phẩm xu hướng được chọn lọc của chúng
              tôi
            </p>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8'>
          {products.slice(0, limit).map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className='group'
            >
              <div className='overflow-hidden rounded-lg border bg-background'>
                <div className='relative aspect-square overflow-hidden'>
                  <Image
                    src={`${
                      product.imageUrl
                        ? product.imageUrl
                        : '/placeholder.svg?height=400&width=400&text=Product+${product.name}'
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
                      {' - '}
                      {formatCurrencyVND(product.price ?? 0)}
                    </span>
                    <Button size='sm' variant='secondary'>
                      <ShoppingCart className='h-4 w-4' />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className='flex justify-center mt-10'>
          <Link href='/products'>
            <Button variant='outline'>Xem tất cả</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
