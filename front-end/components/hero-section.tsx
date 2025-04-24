'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BannerType } from '../lib/types';
import { ApiRequest, ApiResponse } from '../services/apiRequest';
import { Button } from './ui/button';

export default function HeroSection() {
  const [banner, setBanner] = useState<BannerType | null>(null);

  useEffect(() => {
    fetchBanner();
  }, []);
  const fetchBanner = async () => {
    try {
      const result = await ApiRequest<ApiResponse>('banners', 'GET');
      setBanner(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='grid gap-6 lg:grid-cols-2 lg:gap-12 items-center'>
          <div className='space-y-4'>
            <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
              {banner?.title}
            </h1>
            <p className='max-w-[600px] text-muted-foreground md:text-md'>
              {banner?.description}
            </p>
            <div className='flex flex-col gap-2 min-[400px]:flex-row'>
              <Link href='/products'>
                <Button size='lg'>Mua Ngay</Button>
              </Link>
              <Link href='/categories'>
                <Button size='lg' variant='outline'>
                  Xem Danh Mục
                </Button>
              </Link>
            </div>
          </div>
          <div className='mx-auto w-full max-w-[500px] aspect-video overflow-hidden rounded-xl'>
            {banner?.imageUrl ? (
              <Image
                src={banner.imageUrl}
                alt={banner.title}
                width={500}
                height={500}
                className='object-cover'
              />
            ) : (
              <Image
                src='/placeholder.svg?height=600&width=800'
                alt='Hình Ảnh Giới Thiệu'
                width={800}
                height={600}
                className='object-cover w-full h-full'
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
