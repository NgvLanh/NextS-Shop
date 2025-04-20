'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ProductType } from '../lib/types';
import { ApiRequest, ApiResponse } from '../services/apiRequest';
import ProductCard from './product-card';
import { Button } from './ui/button';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [limit, setLimit] = useState<number>(4);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await ApiRequest<ApiResponse>('products', 'GET');
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
            <ProductCard key={product.id} product={product} />
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
