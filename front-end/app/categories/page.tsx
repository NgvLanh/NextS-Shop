'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';
import { CategoryType } from '../../lib/types';
import { ApiRequest, ApiResponse } from '../../services/apiRequest';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await ApiRequest<ApiResponse>('categories', 'GET');
        setCategories(result.data || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        {/* Hero Section */}
        <section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Mua sắm theo danh mục
                </h1>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Duyệt qua danh sách sản phẩm đa dạng của chúng tôi được tổ
                  chức theo danh mục để tìm chính xác những gì bạn đang tìm
                  kiếm.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className='w-full py-12 md:py-24'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {categories.map((category) => (
                <Link
                  href={`#`}
                  key={category.id}
                  className='group overflow-hidden rounded-lg border bg-background transition-colors hover:bg-accent/50'
                >
                  <div className='relative aspect-square overflow-hidden'>
                    <Image
                      src={category.imageUrl || '/placeholder.svg'}
                      alt={category.name}
                      width={400}
                      height={400}
                      className='object-cover w-full h-full transition-transform group-hover:scale-105'
                    />
                  </div>
                  <div className='p-4'>
                    <h3 className='font-bold text-xl'>{category.name}</h3>
                    <p className='text-sm text-muted-foreground mt-1'>
                      {category.name}
                    </p>
                    <p className='text-sm mt-2'>
                      {category.productQuantity} sản phẩm
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className='w-full py-12 md:py-24 bg-muted'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center mb-10'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter'>
                  Danh mục nổi bật
                </h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Khám phá các danh mục sản phẩm phổ biến nhất của chúng tôi
                </p>
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {categories.slice(0, 3).map((category) => (
                <Link
                  href={`/products`}
                  key={category.id}
                  className='group relative overflow-hidden rounded-lg'
                >
                  <div className='aspect-[4/3]'>
                    <Image
                      src={category.imageUrl || '/placeholder.svg'}
                      alt={category.name}
                      fill
                      className='object-cover transition-transform group-hover:scale-105'
                    />
                    <div className='absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center'>
                      <h3 className='text-white text-2xl font-bold'>
                        {category.name}
                      </h3>
                      <p className='text-white/80 mt-2'>
                        {category.productQuantity} sản phẩm
                      </p>
                      <Button className='mt-4'>Mua ngay</Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='w-full py-12 md:py-24'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter'>
                  Không tìm thấy những gì bạn đang tìm kiếm?
                </h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Đội ngũ chăm sóc khách hàng của chúng tôi sẵn sàng giúp bạn
                  tìm sản phẩm hoàn hảo.
                </p>
              </div>
              <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                <Link href='/contact'>
                  <Button size='lg'>Liên hệ với chúng tôi</Button>
                </Link>
                <Link href='/products'>
                  <Button size='lg' variant='outline'>
                    Xem tất cả sản phẩm
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
