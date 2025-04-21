'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CategoryType } from '../lib/types';
import { ApiRequest, ApiResponse } from '../services/apiRequest';

export default function Categories() {
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
    <section className='w-full py-12 md:py-24 bg-muted'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
              Mua sắm theo danh mục
            </h2>
            <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              Duyệt qua nhiều lựa chọn sản phẩm của chúng tôi theo danh mục
            </p>
          </div>
        </div>
        <div className='mt-8'>
          {categories.length > 4 ? (
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={16}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
            >
              {categories.map((category) => (
                <SwiperSlide key={category.id}>
                  <Link href={`/categories`} className='group'>
                    <div className='relative overflow-hidden rounded-lg'>
                      <div className='aspect-square'>
                        <Image
                          src={category.imageUrl}
                          alt={category.name}
                          width={400}
                          height={400}
                          className='object-cover w-full h-full transition-transform group-hover:scale-105'
                        />
                      </div>
                      <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
                        <h3 className='text-white text-xl font-bold'>
                          {category.name}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
              {categories.map((category) => (
                <Link
                  href={`/categories/${category.name}`}
                  key={category.id}
                  className='group'
                >
                  <div className='relative overflow-hidden rounded-lg'>
                    <div className='aspect-square'>
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        width={400}
                        height={400}
                        className='object-cover w-full h-full transition-transform group-hover:scale-105'
                      />
                    </div>
                    <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
                      <h3 className='text-white text-xl font-bold'>
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
