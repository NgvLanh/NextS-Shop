import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import FeaturedProducts from '../components/feature-products';
import HeroSection from '../components/hero-section';
import Footer from '../components/ui/footer';
import Header from '../components/ui/header';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Products */}
        <FeaturedProducts />

        {/* Categories */}
        <section className='w-full py-12 md:py-24 bg-muted'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Shop by Category
                </h2>
                <p className='max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                  Browse our wide selection of products by category
                </p>
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8'>
              {['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty'].map(
                (category) => (
                  <Link
                    href={`/categories/${category
                      .toLowerCase()
                      .replace(' & ', '-')}`}
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
                        <h3 className='text-white text-xl font-bold'>
                          {category}
                        </h3>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className='w-full py-12 md:py-24'>
          <div className='container mx-auto px-4 md:px-6'>
            <div className='grid gap-6 lg:grid-cols-2 lg:gap-12 items-center'>
              <div className='space-y-4'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                  Subscribe to Our Newsletter
                </h2>
                <p className='max-w-[600px] text-muted-foreground md:text-xl'>
                  Stay updated with our latest products, exclusive offers, and
                  promotions.
                </p>
              </div>
              <div className='flex flex-col gap-2 min-[400px]:flex-row'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
