import Image from 'next/image';
import Link from 'next/link';

export default function Categories() {
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
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8'>
          {['Điện tử', 'Quần áo', 'Nhà & Bếp', 'Làm đẹp'].map((category) => (
            <Link
              href={`/categories/${category.toLowerCase().replace(' & ', '-')}`}
              key={category}
              className='group'
            >
              <div className='relative overflow-hidden rounded-lg'>
                <div className='aspect-square'>
                  <Image
                    src={`/placeholder.svg?height=400&width=400&text=${category}`}
                    alt={category}
                    width={400}
                    height={400}
                    className='object-cover w-full h-full transition-transform group-hover:scale-105'
                  />
                </div>
                <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
                  <h3 className='text-white text-xl font-bold'>{category}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
