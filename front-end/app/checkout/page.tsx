'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, CreditCard } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Footer from '../../components/ui/footer';
import Header from '../../components/ui/header';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

  // Mock cart data
  const cartItems = [
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
  ];

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        <div className='container mx-auto py-8'>
          <h1 className='text-3xl font-bold mb-8'>Checkout</h1>

          <div className='flex justify-between items-center mb-8'>
            <div className='flex items-center gap-2'>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step > 1 ? <Check className='h-4 w-4' /> : 1}
              </div>
              <span
                className={step >= 1 ? 'font-medium' : 'text-muted-foreground'}
              >
                Shipping
              </span>
            </div>
            <div className='h-px w-12 bg-muted'></div>
            <div className='flex items-center gap-2'>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step > 2 ? <Check className='h-4 w-4' /> : 2}
              </div>
              <span
                className={step >= 2 ? 'font-medium' : 'text-muted-foreground'}
              >
                Payment
              </span>
            </div>
            <div className='h-px w-12 bg-muted'></div>
            <div className='flex items-center gap-2'>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step > 3 ? <Check className='h-4 w-4' /> : 3}
              </div>
              <span
                className={step >= 3 ? 'font-medium' : 'text-muted-foreground'}
              >
                Review
              </span>
            </div>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='md:col-span-2'>
              {step === 1 && (
                <div className='border rounded-lg p-6 space-y-6'>
                  <h2 className='text-xl font-bold'>Shipping Information</h2>

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='first-name'>First Name</Label>
                      <Input id='first-name' placeholder='John' />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='last-name'>Last Name</Label>
                      <Input id='last-name' placeholder='Doe' />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='john.doe@example.com'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='phone'>Phone</Label>
                    <Input
                      id='phone'
                      type='tel'
                      placeholder='+1 (555) 123-4567'
                    />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='address'>Address</Label>
                    <Input id='address' placeholder='123 Main St' />
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='address2'>Address Line 2 (Optional)</Label>
                    <Input id='address2' placeholder='Apt 4B' />
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='city'>City</Label>
                      <Input id='city' placeholder='New York' />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='state'>State</Label>
                      <Select>
                        <SelectTrigger id='state'>
                          <SelectValue placeholder='Select state' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='ny'>New York</SelectItem>
                          <SelectItem value='ca'>California</SelectItem>
                          <SelectItem value='tx'>Texas</SelectItem>
                          <SelectItem value='fl'>Florida</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='zip'>ZIP Code</Label>
                      <Input id='zip' placeholder='10001' />
                    </div>
                  </div>

                  <div className='space-y-2'>
                    <Label htmlFor='country'>Country</Label>
                    <Select defaultValue='us'>
                      <SelectTrigger id='country'>
                        <SelectValue placeholder='Select country' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='us'>United States</SelectItem>
                        <SelectItem value='ca'>Canada</SelectItem>
                        <SelectItem value='uk'>United Kingdom</SelectItem>
                        <SelectItem value='au'>Australia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className='pt-4'>
                    <Button onClick={nextStep} className='w-full'>
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className='border rounded-lg p-6 space-y-6'>
                  <h2 className='text-xl font-bold'>Payment Method</h2>

                  <Tabs defaultValue='card'>
                    <TabsList className='grid w-full grid-cols-3'>
                      <TabsTrigger value='card'>Credit Card</TabsTrigger>
                      <TabsTrigger value='paypal'>PayPal</TabsTrigger>
                      <TabsTrigger value='apple'>Apple Pay</TabsTrigger>
                    </TabsList>
                    <TabsContent value='card' className='space-y-6 pt-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='card-name'>Name on Card</Label>
                        <Input id='card-name' placeholder='John Doe' />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='card-number'>Card Number</Label>
                        <Input
                          id='card-number'
                          placeholder='1234 5678 9012 3456'
                        />
                      </div>

                      <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                          <Label htmlFor='expiry'>Expiry Date</Label>
                          <Input id='expiry' placeholder='MM/YY' />
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='cvc'>CVC</Label>
                          <Input id='cvc' placeholder='123' />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value='paypal' className='space-y-6 pt-4'>
                      <div className='text-center py-8'>
                        <p className='text-muted-foreground mb-4'>
                          You will be redirected to PayPal to complete your
                          payment.
                        </p>
                        <Button variant='outline' className='w-full'>
                          Continue with PayPal
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value='apple' className='space-y-6 pt-4'>
                      <div className='text-center py-8'>
                        <p className='text-muted-foreground mb-4'>
                          You will be redirected to Apple Pay to complete your
                          payment.
                        </p>
                        <Button variant='outline' className='w-full'>
                          Continue with Apple Pay
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className='pt-4 flex gap-4'>
                    <Button
                      variant='outline'
                      onClick={prevStep}
                      className='w-full'
                    >
                      Back
                    </Button>
                    <Button onClick={nextStep} className='w-full'>
                      Review Order
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className='border rounded-lg p-6 space-y-6'>
                  <h2 className='text-xl font-bold'>Review Your Order</h2>

                  <div className='space-y-4'>
                    <div className='border-b pb-4'>
                      <h3 className='font-medium mb-2'>Shipping Information</h3>
                      <p>John Doe</p>
                      <p>123 Main St, Apt 4B</p>
                      <p>New York, NY 10001</p>
                      <p>United States</p>
                      <p>john.doe@example.com</p>
                      <p>+1 (555) 123-4567</p>
                    </div>

                    <div className='border-b pb-4'>
                      <h3 className='font-medium mb-2'>Payment Method</h3>
                      <div className='flex items-center gap-2'>
                        <CreditCard className='h-5 w-5' />
                        <span>Credit Card ending in 3456</span>
                      </div>
                    </div>

                    <div>
                      <h3 className='font-medium mb-2'>Items</h3>
                      <div className='space-y-4'>
                        {cartItems.map((item) => (
                          <div key={item.id} className='flex gap-4'>
                            <div className='w-16 h-16 rounded-md overflow-hidden'>
                              <Image
                                src={item.image || '/placeholder.svg'}
                                alt={item.name}
                                width={64}
                                height={64}
                                className='object-cover w-full h-full'
                              />
                            </div>
                            <div className='flex-1'>
                              <h4 className='font-medium'>{item.name}</h4>
                              <p className='text-sm text-muted-foreground'>
                                Quantity: {item.quantity}
                              </p>
                            </div>
                            <div className='text-right'>
                              <p className='font-medium'>
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className='pt-4 flex gap-4'>
                    <Button
                      variant='outline'
                      onClick={prevStep}
                      className='w-full'
                    >
                      Back
                    </Button>
                    <Button className='w-full'>Place Order</Button>
                  </div>
                </div>
              )}
            </div>

            <div className='md:col-span-1'>
              <div className='border rounded-lg p-6 space-y-6 sticky top-20'>
                <h2 className='text-lg font-bold mb-4'>Order Summary</h2>

                <div className='space-y-4'>
                  {cartItems.map((item) => (
                    <div key={item.id} className='flex gap-4'>
                      <div className='w-16 h-16 rounded-md overflow-hidden'>
                        <Image
                          src={item.image || '/placeholder.svg'}
                          alt={item.name}
                          width={64}
                          height={64}
                          className='object-cover w-full h-full'
                        />
                      </div>
                      <div className='flex-1'>
                        <h4 className='font-medium'>{item.name}</h4>
                        <p className='text-sm text-muted-foreground'>
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className='text-right'>
                        <p className='font-medium'>
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='border-t pt-4 space-y-2'>
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
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
