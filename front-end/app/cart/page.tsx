'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Footer from '../../components/ui/footer';
import Header from '../../components/ui/header';

export default function CartPage() {
  // Mock cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Product Name 1',
      price: 99.99,
      quantity: 1,
      image: '/placeholder.svg?height=200&width=200&text=Product+1',
    },
    {
      id: 2,
      name: 'Product Name 2',
      price: 149.99,
      quantity: 2,
      image: '/placeholder.svg?height=200&width=200&text=Product+2',
    },
    {
      id: 3,
      name: 'Product Name 3',
      price: 79.99,
      quantity: 1,
      image: '/placeholder.svg?height=200&width=200&text=Product+3',
    },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        <div className='container mx-auto py-8'>
          <h1 className='text-3xl font-bold mb-8'>Your Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className='text-center py-12'>
              <div className='mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-muted mb-6'>
                <ShoppingCart className='h-12 w-12 text-muted-foreground' />
              </div>
              <h2 className='text-xl font-medium mb-2'>Your cart is empty</h2>
              <p className='text-muted-foreground mb-6'>
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link href='/products'>
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className='grid md:grid-cols-3 gap-8'>
              <div className='md:col-span-2'>
                <div className='border rounded-lg overflow-hidden'>
                  <div className='hidden sm:grid grid-cols-12 gap-4 p-4 bg-muted text-sm font-medium'>
                    <div className='col-span-6'>Product</div>
                    <div className='col-span-2 text-center'>Price</div>
                    <div className='col-span-2 text-center'>Quantity</div>
                    <div className='col-span-2 text-right'>Total</div>
                  </div>

                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className='grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 border-t first:border-t-0 items-center'
                    >
                      <div className='col-span-6 flex items-center gap-4'>
                        <div className='w-20 h-20 rounded-md overflow-hidden'>
                          <Image
                            src={item.image || '/placeholder.svg'}
                            alt={item.name}
                            width={80}
                            height={80}
                            className='object-cover w-full h-full'
                          />
                        </div>
                        <div>
                          <h3 className='font-medium'>{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className='text-sm text-red-500 flex items-center mt-1'
                          >
                            <Trash2 className='h-3 w-3 mr-1' />
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className='col-span-2 text-center'>
                        <span className='sm:hidden font-medium mr-2'>
                          Price:
                        </span>
                        ${item.price.toFixed(2)}
                      </div>
                      <div className='col-span-2 flex items-center justify-center'>
                        <div className='flex items-center'>
                          <Button
                            variant='outline'
                            size='icon'
                            className='h-8 w-8'
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className='h-3 w-3' />
                          </Button>
                          <span className='w-10 text-center'>
                            {item.quantity}
                          </span>
                          <Button
                            variant='outline'
                            size='icon'
                            className='h-8 w-8'
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className='h-3 w-3' />
                          </Button>
                        </div>
                      </div>
                      <div className='col-span-2 text-right font-medium'>
                        <span className='sm:hidden font-medium mr-2'>
                          Total:
                        </span>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className='flex flex-col sm:flex-row justify-between items-center mt-6 gap-4'>
                  <div className='flex w-full sm:w-auto'>
                    <Input
                      placeholder='Coupon code'
                      className='rounded-r-none'
                    />
                    <Button className='rounded-l-none'>Apply</Button>
                  </div>
                  <Button variant='outline' asChild>
                    <Link href='/products'>Continue Shopping</Link>
                  </Button>
                </div>
              </div>

              <div className='md:col-span-1'>
                <div className='border rounded-lg p-6 space-y-6 sticky top-20'>
                  <h2 className='text-lg font-bold mb-4'>Order Summary</h2>

                  <div className='space-y-2'>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className='border-t pt-2 mt-2'>
                      <div className='flex justify-between font-bold'>
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button className='w-full' size='lg' asChild>
                    <Link href='/checkout'>
                      Proceed to Checkout
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Link>
                  </Button>

                  <div className='text-xs text-muted-foreground text-center'>
                    <p>We accept the following payment methods:</p>
                    <div className='flex justify-center gap-2 mt-2'>
                      <div className='w-10 h-6 bg-muted rounded'></div>
                      <div className='w-10 h-6 bg-muted rounded'></div>
                      <div className='w-10 h-6 bg-muted rounded'></div>
                      <div className='w-10 h-6 bg-muted rounded'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
