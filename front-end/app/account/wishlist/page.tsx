import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function WishlistPage() {
  // Mock wishlist data
  const wishlist = [
    {
      id: 1,
      name: 'Product Name 1',
      price: 99.99,
      image: '/placeholder.svg?height=200&width=200&text=Product+1',
    },
    {
      id: 2,
      name: 'Product Name 2',
      price: 149.99,
      image: '/placeholder.svg?height=200&width=200&text=Product+2',
    },
    {
      id: 3,
      name: 'Product Name 3',
      price: 79.99,
      image: '/placeholder.svg?height=200&width=200&text=Product+3',
    },
    {
      id: 4,
      name: 'Product Name 4',
      price: 129.99,
      image: '/placeholder.svg?height=200&width=200&text=Product+4',
    },
  ];

  return (
    <div className='container mx-auto py-8'>
      <div className='flex items-center gap-4 mb-8'>
        <Link href='/account'>
          <Button variant='ghost' size='icon'>
            <ArrowLeft className='h-5 w-5' />
          </Button>
        </Link>
        <h1 className='text-3xl font-bold'>My Wishlist</h1>
      </div>

      <div className='border rounded-lg overflow-hidden'>
        <h2 className='text-xl font-bold p-6 border-b'>Saved Items</h2>

        {wishlist.length === 0 ? (
          <div className='text-center py-12'>
            <div className='mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-muted mb-6'>
              <Heart className='h-12 w-12 text-muted-foreground' />
            </div>
            <h3 className='text-lg font-medium mb-2'>Your wishlist is empty</h3>
            <p className='text-muted-foreground mb-6'>
              Save items you like to your wishlist.
            </p>
            <Link href='/products'>
              <Button>Explore Products</Button>
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
            {wishlist.map((item) => (
              <div key={item.id} className='border rounded-lg overflow-hidden'>
                <div className='aspect-square relative'>
                  <Image
                    src={item.image || '/placeholder.svg'}
                    alt={item.name}
                    fill
                    className='object-cover'
                  />
                </div>
                <div className='p-4'>
                  <h3 className='font-medium'>{item.name}</h3>
                  <p className='text-sm text-muted-foreground mb-4'>
                    ${item.price.toFixed(2)}
                  </p>
                  <div className='flex gap-2'>
                    <Button size='sm' className='flex-1'>
                      Add to Cart
                    </Button>
                    <Button size='sm' variant='outline' className='flex-1'>
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
