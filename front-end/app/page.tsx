import { Button } from '@/components/ui/button';
import Categories from '../components/categories';
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
        <Categories />

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
