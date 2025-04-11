import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../components/ui/footer';
import Header from '../../components/ui/header';

export default function CategoriesPage() {
  // Mock categories data
  const categories = [
    {
      id: 1,
      name: 'Electronics',
      description: 'Gadgets, devices, and tech accessories',
      image: '/placeholder.svg?height=400&width=400&text=Electronics',
      productCount: 124,
    },
    {
      id: 2,
      name: 'Clothing',
      description: 'Fashion items for all ages and styles',
      image: '/placeholder.svg?height=400&width=400&text=Clothing',
      productCount: 98,
    },
    {
      id: 3,
      name: 'Home & Kitchen',
      description: 'Everything for your home and kitchen needs',
      image: '/placeholder.svg?height=400&width=400&text=Home',
      productCount: 76,
    },
    {
      id: 4,
      name: 'Beauty',
      description: 'Skincare, makeup, and personal care products',
      image: '/placeholder.svg?height=400&width=400&text=Beauty',
      productCount: 52,
    },
    {
      id: 5,
      name: 'Sports & Outdoors',
      description: 'Equipment and gear for all your activities',
      image: '/placeholder.svg?height=400&width=400&text=Sports',
      productCount: 43,
    },
    {
      id: 6,
      name: 'Books',
      description: 'Fiction, non-fiction, and educational titles',
      image: '/placeholder.svg?height=400&width=400&text=Books',
      productCount: 87,
    },
    {
      id: 7,
      name: 'Toys & Games',
      description: 'Fun for all ages with toys and games',
      image: '/placeholder.svg?height=400&width=400&text=Toys',
      productCount: 65,
    },
    {
      id: 8,
      name: 'Automotive',
      description: 'Parts, accessories, and tools for vehicles',
      image: '/placeholder.svg?height=400&width=400&text=Auto',
      productCount: 34,
    },
  ];

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
                  Shop by Category
                </h1>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Browse our wide selection of products organized by category to
                  find exactly what you're looking for.
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
                  href={`/categories/${category.id}`}
                  key={category.id}
                  className='group overflow-hidden rounded-lg border bg-background transition-colors hover:bg-accent/50'
                >
                  <div className='relative aspect-square overflow-hidden'>
                    <Image
                      src={category.image || '/placeholder.svg'}
                      alt={category.name}
                      width={400}
                      height={400}
                      className='object-cover w-full h-full transition-transform group-hover:scale-105'
                    />
                  </div>
                  <div className='p-4'>
                    <h3 className='font-bold text-xl'>{category.name}</h3>
                    <p className='text-sm text-muted-foreground mt-1'>
                      {category.description}
                    </p>
                    <p className='text-sm mt-2'>
                      {category.productCount} products
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
                  Featured Categories
                </h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Explore our most popular product categories
                </p>
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {categories.slice(0, 3).map((category) => (
                <Link
                  href={`/categories/${category.id}`}
                  key={category.id}
                  className='group relative overflow-hidden rounded-lg'
                >
                  <div className='aspect-[4/3]'>
                    <Image
                      src={category.image || '/placeholder.svg'}
                      alt={category.name}
                      fill
                      className='object-cover transition-transform group-hover:scale-105'
                    />
                    <div className='absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center'>
                      <h3 className='text-white text-2xl font-bold'>
                        {category.name}
                      </h3>
                      <p className='text-white/80 mt-2'>
                        {category.productCount} products
                      </p>
                      <Button className='mt-4'>Shop Now</Button>
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
                  Can't Find What You're Looking For?
                </h2>
                <p className='max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Our customer service team is here to help you find the perfect
                  product.
                </p>
              </div>
              <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                <Link href='/contact'>
                  <Button size='lg'>Contact Us</Button>
                </Link>
                <Link href='/products'>
                  <Button size='lg' variant='outline'>
                    View All Products
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
