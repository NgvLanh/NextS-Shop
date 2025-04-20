'use client';
import { Button } from '@/components/ui/button';
import { toast } from '../hooks/use-toast';

export default function Newsletter() {
  const handleSubscribe = () => {
    toast({
      title: 'Chức năng đang phát triển',
      description:
        'Cảm ơn bạn đã quan tâm! Chúng tôi sẽ sớm ra mắt tính năng này.',
    });
  };

  return (
    <section className='w-full py-12 md:py-24'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='grid gap-6 lg:grid-cols-2 lg:gap-12 items-center'>
          <div className='space-y-4'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              Đăng ký nhận bản tin của chúng tôi
            </h2>
            <p className='max-w-[600px] text-muted-foreground md:text-xl'>
              Cập nhật những sản phẩm mới nhất, ưu đãi độc quyền và khuyến mãi
              từ chúng tôi.
            </p>
          </div>
          <div className='flex flex-col gap-2 min-[400px]:flex-row'>
            <input
              type='email'
              placeholder='Nhập email của bạn'
              className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            />
            <Button onClick={handleSubscribe}>Đăng ký</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
