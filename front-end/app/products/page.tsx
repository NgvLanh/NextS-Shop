import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ChevronDown, Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../components/ui/footer';
import Header from '../../components/ui/header';

export default function ProductsPage() {
  // Mock products data
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Product Name ${i + 1}`,
    category: i % 2 === 0 ? 'Electronics' : 'Clothing',
    price: 99.99,
    image: `/placeholder.svg?height=400&width=400&text=Product+${i + 1}`,
  }));

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        <div className='container mx-auto py-8'>
          <div className='flex flex-col md:flex-row gap-8'>
            {/* Filters Sidebar */}
            <div className='w-full md:w-1/4 space-y-6'>
              <div>
                <h3 className='font-medium text-lg mb-4'>Categories</h3>
                <div className='space-y-2'>
                  {[
                    'All',
                    'Electronics',
                    'Clothing',
                    'Home & Kitchen',
                    'Beauty',
                  ].map((category) => (
                    <div key={category} className='flex items-center'>
                      <input
                        type='checkbox'
                        id={`category-${category}`}
                        className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className='ml-2 text-sm'
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className='font-medium text-lg mb-4'>Price Range</h3>
                <div className='space-y-4'>
                  <Slider defaultValue={[0, 1000]} max={1000} step={1} />
                  <div className='flex items-center justify-between'>
                    <div className='text-sm'>$0</div>
                    <div className='text-sm'>$1000</div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className='font-medium text-lg mb-4'>Ratings</h3>
                <div className='space-y-2'>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className='flex items-center'>
                      <input
                        type='checkbox'
                        id={`rating-${rating}`}
                        className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
                      />
                      <label
                        htmlFor={`rating-${rating}`}
                        className='ml-2 text-sm'
                      >
                        {rating} Stars & Above
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <Button className='w-full'>Apply Filters</Button>
            </div>

            {/* Products Grid */}
            <div className='w-full md:w-3/4'>
              <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
                <h1 className='text-2xl font-bold'>All Products</h1>
                <div className='flex items-center gap-4 w-full sm:w-auto'>
                  <Input
                    placeholder='Search products...'
                    className='max-w-xs'
                  />
                  <Select defaultValue='featured'>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Sort by' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='featured'>Featured</SelectItem>
                      <SelectItem value='price-low'>
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value='price-high'>
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value='newest'>Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {products.map((product) => (
                  <Link
                    href={`/products/${product.id}`}
                    key={product.id}
                    className='group'
                  >
                    <div className='overflow-hidden rounded-lg border bg-background'>
                      <div className='relative aspect-square overflow-hidden'>
                        <Image
                          src={product.image || '/placeholder.svg'}
                          alt={product.name}
                          width={400}
                          height={400}
                          className='object-cover transition-transform group-hover:scale-105'
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
                          {product.category}
                        </p>
                        <div className='mt-2 flex items-center justify-between'>
                          <span className='font-medium'>
                            ${product.price.toFixed(2)}
                          </span>
                          <Button size='sm' variant='secondary'>
                            <ShoppingCart className='mr-2 h-4 w-4' />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className='flex justify-center mt-10'>
                <div className='flex items-center gap-2'>
                  <Button variant='outline' size='icon' disabled>
                    <ChevronDown className='h-4 w-4 rotate-90' />
                  </Button>
                  <Button variant='outline' size='sm' className='h-8 w-8'>
                    1
                  </Button>
                  <Button variant='outline' size='sm' className='h-8 w-8'>
                    2
                  </Button>
                  <Button variant='outline' size='sm' className='h-8 w-8'>
                    3
                  </Button>
                  <span>...</span>
                  <Button variant='outline' size='sm' className='h-8 w-8'>
                    10
                  </Button>
                  <Button variant='outline' size='icon'>
                    <ChevronDown className='h-4 w-4 -rotate-90' />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
