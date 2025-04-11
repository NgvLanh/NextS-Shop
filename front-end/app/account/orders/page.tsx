'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Package,
  Truck,
  XCircle,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Mock product data for order details
const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 129.99,
    image: '/placeholder.svg?height=80&width=80',
    color: 'Black',
    size: 'One Size',
  },
  {
    id: 2,
    name: 'Ergonomic Keyboard',
    price: 89.99,
    image: '/placeholder.svg?height=80&width=80',
    color: 'White',
    size: 'Standard',
  },
  {
    id: 3,
    name: 'Ultra HD Monitor',
    price: 299.99,
    image: '/placeholder.svg?height=80&width=80',
    color: 'Silver',
    size: '27 inch',
  },
  {
    id: 4,
    name: 'Wireless Mouse',
    price: 49.99,
    image: '/placeholder.svg?height=80&width=80',
    color: 'Black',
    size: 'Standard',
  },
  {
    id: 5,
    name: 'Laptop Stand',
    price: 39.99,
    image: '/placeholder.svg?height=80&width=80',
    color: 'Silver',
    size: 'Adjustable',
  },
];

// Mock orders data with product IDs
const orders = [
  {
    id: 'ORD-7352',
    date: '2023-05-15',
    status: 'Delivered',
    total: 249.97,
    items: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 1 },
      { productId: 4, quantity: 1 },
    ],
    tracking: 'TRK123456789',
    paymentMethod: 'Credit Card',
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    },
    billingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    },
    subtotal: 219.97,
    shipping: 10.0,
    tax: 20.0,
  },
  {
    id: 'ORD-7353',
    date: '2023-04-28',
    status: 'Processing',
    total: 149.99,
    items: [{ productId: 3, quantity: 1 }],
    tracking: 'TRK987654321',
    paymentMethod: 'PayPal',
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    },
    billingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    },
    subtotal: 129.99,
    shipping: 10.0,
    tax: 10.0,
  },
  {
    id: 'ORD-7354',
    date: '2023-03-10',
    status: 'Delivered',
    total: 79.99,
    items: [{ productId: 5, quantity: 2 }],
    tracking: 'TRK456789123',
    paymentMethod: 'Credit Card',
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    },
    billingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    },
    subtotal: 69.99,
    shipping: 5.0,
    tax: 5.0,
  },
  {
    id: 'ORD-7355',
    date: '2023-02-22',
    status: 'Cancelled',
    total: 129.99,
    items: [{ productId: 1, quantity: 1 }],
    tracking: '',
    paymentMethod: 'Credit Card',
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    },
    billingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    },
    subtotal: 119.99,
    shipping: 0.0,
    tax: 10.0,
  },
  {
    id: 'ORD-7356',
    date: '2023-01-15',
    status: 'Delivered',
    total: 199.99,
    items: [
      { productId: 2, quantity: 1 },
      { productId: 4, quantity: 2 },
    ],
    tracking: 'TRK789123456',
    paymentMethod: 'PayPal',
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    },
    billingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
    },
    subtotal: 179.99,
    shipping: 10.0,
    tax: 10.0,
  },
];

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(
    null
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return (
          <Badge className='bg-green-100 text-green-800 hover:bg-green-100'>
            {status}
          </Badge>
        );
      case 'Processing':
        return (
          <Badge className='bg-blue-100 text-blue-800 hover:bg-blue-100'>
            {status}
          </Badge>
        );
      case 'Shipped':
        return (
          <Badge className='bg-purple-100 text-purple-800 hover:bg-purple-100'>
            {status}
          </Badge>
        );
      case 'Cancelled':
        return (
          <Badge className='bg-red-100 text-red-800 hover:bg-red-100'>
            {status}
          </Badge>
        );
      default:
        return (
          <Badge className='bg-gray-100 text-gray-800 hover:bg-gray-100'>
            {status}
          </Badge>
        );
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className='h-5 w-5 text-green-500' />;
      case 'Processing':
        return <Clock className='h-5 w-5 text-blue-500' />;
      case 'Shipped':
        return <Truck className='h-5 w-5 text-purple-500' />;
      case 'Cancelled':
        return <XCircle className='h-5 w-5 text-red-500' />;
      default:
        return <Package className='h-5 w-5 text-gray-500' />;
    }
  };

  const getOrderItems = (order: (typeof orders)[0]) => {
    return order.items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        ...product,
        quantity: item.quantity,
      };
    });
  };

  const handleOpenOrderDetails = (order: (typeof orders)[0]) => {
    setSelectedOrder(order);
  };

  return (
    <div className='container mx-auto py-8'>
      <div className='flex items-center gap-2 mb-6'>
        <Link href='/account'>
          <Button variant='outline' size='icon' className='rounded-full'>
            <ArrowLeft className='h-4 w-4' />
          </Button>
        </Link>
        <h1 className='text-2xl font-bold'>My Orders</h1>
      </div>

      <Tabs defaultValue='all' className='space-y-6'>
        <TabsList>
          <TabsTrigger value='all'>All Orders</TabsTrigger>
          <TabsTrigger value='processing'>Processing</TabsTrigger>
          <TabsTrigger value='shipped'>Shipped</TabsTrigger>
          <TabsTrigger value='delivered'>Delivered</TabsTrigger>
          <TabsTrigger value='cancelled'>Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value='all' className='space-y-6'>
          {orders.length === 0 ? (
            <div className='text-center py-12'>
              <div className='mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-muted mb-6'>
                <Package className='h-12 w-12 text-muted-foreground' />
              </div>
              <h3 className='text-lg font-medium mb-2'>No orders yet</h3>
              <p className='text-muted-foreground mb-6'>
                You haven't placed any orders yet.
              </p>
              <Link href='/products'>
                <Button>Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className='space-y-4'>
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader className='pb-2'>
                    <div className='flex justify-between items-center'>
                      <CardTitle className='text-lg'>{order.id}</CardTitle>
                      {getStatusBadge(order.status)}
                    </div>
                    <CardDescription>Placed on {order.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='grid gap-4 md:grid-cols-2'>
                      <div>
                        <div className='flex items-center gap-2 mb-2'>
                          {getStatusIcon(order.status)}
                          <span className='font-medium'>{order.status}</span>
                        </div>
                        <p className='text-sm text-muted-foreground'>
                          {order.items.length}{' '}
                          {order.items.length === 1 ? 'item' : 'items'} • $
                          {order.total.toFixed(2)}
                        </p>
                        <p className='text-sm text-muted-foreground'>
                          Payment: {order.paymentMethod}
                        </p>
                        {order.tracking && (
                          <p className='text-sm text-muted-foreground'>
                            Tracking: {order.tracking}
                          </p>
                        )}
                      </div>
                      <div className='flex justify-end gap-2'>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={() => handleOpenOrderDetails(order)}
                            >
                              <Eye className='mr-2 h-4 w-4' />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className='sm:max-w-[600px]'>
                            <DialogHeader>
                              <DialogTitle>Order {order.id}</DialogTitle>
                              <DialogDescription>
                                Placed on {order.date} •{' '}
                                {getStatusBadge(order.status)}
                              </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className='max-h-[70vh]'>
                              <div className='space-y-6 p-1'>
                                <div>
                                  <h3 className='font-medium mb-2'>
                                    Order Items
                                  </h3>
                                  <div className='space-y-4'>
                                    {getOrderItems(order).map((item, index) => (
                                      <div key={index} className='flex gap-4'>
                                        <div className='h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0'>
                                          <Image
                                            src={
                                              item.image || '/placeholder.svg'
                                            }
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                            className='h-full w-full object-cover'
                                          />
                                        </div>
                                        <div className='flex-1'>
                                          <h4 className='font-medium'>
                                            {item.name}
                                          </h4>
                                          <div className='text-sm text-muted-foreground'>
                                            <p>Color: {item.color}</p>
                                            <p>Size: {item.size}</p>
                                            <p>Quantity: {item.quantity}</p>
                                          </div>
                                        </div>
                                        <div className='text-right'>
                                          <p className='font-medium'>
                                            ${item.price.toFixed(2)}
                                          </p>
                                          {item.quantity > 1 && (
                                            <p className='text-sm text-muted-foreground'>
                                              $
                                              {(
                                                item.price * item.quantity
                                              ).toFixed(2)}{' '}
                                              total
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <Separator />

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                  <div>
                                    <h3 className='font-medium mb-2'>
                                      Shipping Address
                                    </h3>
                                    <div className='text-sm'>
                                      <p>{order.shippingAddress.name}</p>
                                      <p>{order.shippingAddress.street}</p>
                                      <p>
                                        {order.shippingAddress.city},{' '}
                                        {order.shippingAddress.state}{' '}
                                        {order.shippingAddress.zip}
                                      </p>
                                      <p>{order.shippingAddress.country}</p>
                                    </div>
                                  </div>

                                  <div>
                                    <h3 className='font-medium mb-2'>
                                      Billing Address
                                    </h3>
                                    <div className='text-sm'>
                                      <p>{order.billingAddress.name}</p>
                                      <p>{order.billingAddress.street}</p>
                                      <p>
                                        {order.billingAddress.city},{' '}
                                        {order.billingAddress.state}{' '}
                                        {order.billingAddress.zip}
                                      </p>
                                      <p>{order.billingAddress.country}</p>
                                    </div>
                                  </div>
                                </div>

                                <Separator />

                                <div>
                                  <h3 className='font-medium mb-2'>
                                    Payment Information
                                  </h3>
                                  <div className='text-sm'>
                                    <p>Payment Method: {order.paymentMethod}</p>
                                    {order.tracking && (
                                      <p>Tracking Number: {order.tracking}</p>
                                    )}
                                  </div>
                                </div>

                                <Separator />

                                <div>
                                  <h3 className='font-medium mb-2'>
                                    Order Summary
                                  </h3>
                                  <div className='space-y-2'>
                                    <div className='flex justify-between text-sm'>
                                      <span>Subtotal</span>
                                      <span>${order.subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className='flex justify-between text-sm'>
                                      <span>Shipping</span>
                                      <span>${order.shipping.toFixed(2)}</span>
                                    </div>
                                    <div className='flex justify-between text-sm'>
                                      <span>Tax</span>
                                      <span>${order.tax.toFixed(2)}</span>
                                    </div>
                                    <Separator />
                                    <div className='flex justify-between font-medium'>
                                      <span>Total</span>
                                      <span>${order.total.toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </ScrollArea>
                            <div className='flex justify-end gap-2 mt-4'>
                              {order.status === 'Delivered' && (
                                <Button variant='outline' size='sm'>
                                  <Download className='mr-2 h-4 w-4' />
                                  Download Invoice
                                </Button>
                              )}
                              <DialogTrigger asChild>
                                <Button variant='default' size='sm'>
                                  Close
                                </Button>
                              </DialogTrigger>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {order.status === 'Delivered' && (
                          <Button variant='outline' size='sm'>
                            <Download className='mr-2 h-4 w-4' />
                            Invoice
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {['processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
          <TabsContent key={status} value={status} className='space-y-6'>
            <div className='space-y-4'>
              {orders.filter((order) => order.status.toLowerCase() === status)
                .length === 0 ? (
                <div className='text-center py-12'>
                  <div className='mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-muted mb-6'>
                    <Package className='h-12 w-12 text-muted-foreground' />
                  </div>
                  <h3 className='text-lg font-medium mb-2'>
                    No {status} orders
                  </h3>
                  <p className='text-muted-foreground mb-6'>
                    You don't have any {status} orders at the moment.
                  </p>
                </div>
              ) : (
                orders
                  .filter((order) => order.status.toLowerCase() === status)
                  .map((order) => (
                    <Card key={order.id}>
                      <CardHeader className='pb-2'>
                        <div className='flex justify-between items-center'>
                          <CardTitle className='text-lg'>{order.id}</CardTitle>
                          {getStatusBadge(order.status)}
                        </div>
                        <CardDescription>
                          Placed on {order.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className='grid gap-4 md:grid-cols-2'>
                          <div>
                            <div className='flex items-center gap-2 mb-2'>
                              {getStatusIcon(order.status)}
                              <span className='font-medium'>
                                {order.status}
                              </span>
                            </div>
                            <p className='text-sm text-muted-foreground'>
                              {order.items.length}{' '}
                              {order.items.length === 1 ? 'item' : 'items'} • $
                              {order.total.toFixed(2)}
                            </p>
                            <p className='text-sm text-muted-foreground'>
                              Payment: {order.paymentMethod}
                            </p>
                            {order.tracking && (
                              <p className='text-sm text-muted-foreground'>
                                Tracking: {order.tracking}
                              </p>
                            )}
                          </div>
                          <div className='flex justify-end gap-2'>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant='outline'
                                  size='sm'
                                  onClick={() => handleOpenOrderDetails(order)}
                                >
                                  <Eye className='mr-2 h-4 w-4' />
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className='sm:max-w-[600px]'>
                                <DialogHeader>
                                  <DialogTitle>Order {order.id}</DialogTitle>
                                  <DialogDescription>
                                    Placed on {order.date} •{' '}
                                    {getStatusBadge(order.status)}
                                  </DialogDescription>
                                </DialogHeader>
                                <ScrollArea className='max-h-[70vh]'>
                                  <div className='space-y-6 p-1'>
                                    <div>
                                      <h3 className='font-medium mb-2'>
                                        Order Items
                                      </h3>
                                      <div className='space-y-4'>
                                        {getOrderItems(order).map(
                                          (item, index) => (
                                            <div
                                              key={index}
                                              className='flex gap-4'
                                            >
                                              <div className='h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0'>
                                                <Image
                                                  src={
                                                    item.image ||
                                                    '/placeholder.svg'
                                                  }
                                                  alt={item.name}
                                                  width={80}
                                                  height={80}
                                                  className='h-full w-full object-cover'
                                                />
                                              </div>
                                              <div className='flex-1'>
                                                <h4 className='font-medium'>
                                                  {item.name}
                                                </h4>
                                                <div className='text-sm text-muted-foreground'>
                                                  <p>Color: {item.color}</p>
                                                  <p>Size: {item.size}</p>
                                                  <p>
                                                    Quantity: {item.quantity}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className='text-right'>
                                                <p className='font-medium'>
                                                  ${item.price.toFixed(2)}
                                                </p>
                                                {item.quantity > 1 && (
                                                  <p className='text-sm text-muted-foreground'>
                                                    $
                                                    {(
                                                      item.price * item.quantity
                                                    ).toFixed(2)}{' '}
                                                    total
                                                  </p>
                                                )}
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>

                                    <Separator />

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                      <div>
                                        <h3 className='font-medium mb-2'>
                                          Shipping Address
                                        </h3>
                                        <div className='text-sm'>
                                          <p>{order.shippingAddress.name}</p>
                                          <p>{order.shippingAddress.street}</p>
                                          <p>
                                            {order.shippingAddress.city},{' '}
                                            {order.shippingAddress.state}{' '}
                                            {order.shippingAddress.zip}
                                          </p>
                                          <p>{order.shippingAddress.country}</p>
                                        </div>
                                      </div>

                                      <div>
                                        <h3 className='font-medium mb-2'>
                                          Billing Address
                                        </h3>
                                        <div className='text-sm'>
                                          <p>{order.billingAddress.name}</p>
                                          <p>{order.billingAddress.street}</p>
                                          <p>
                                            {order.billingAddress.city},{' '}
                                            {order.billingAddress.state}{' '}
                                            {order.billingAddress.zip}
                                          </p>
                                          <p>{order.billingAddress.country}</p>
                                        </div>
                                      </div>
                                    </div>

                                    <Separator />

                                    <div>
                                      <h3 className='font-medium mb-2'>
                                        Payment Information
                                      </h3>
                                      <div className='text-sm'>
                                        <p>
                                          Payment Method: {order.paymentMethod}
                                        </p>
                                        {order.tracking && (
                                          <p>
                                            Tracking Number: {order.tracking}
                                          </p>
                                        )}
                                      </div>
                                    </div>

                                    <Separator />

                                    <div>
                                      <h3 className='font-medium mb-2'>
                                        Order Summary
                                      </h3>
                                      <div className='space-y-2'>
                                        <div className='flex justify-between text-sm'>
                                          <span>Subtotal</span>
                                          <span>
                                            ${order.subtotal.toFixed(2)}
                                          </span>
                                        </div>
                                        <div className='flex justify-between text-sm'>
                                          <span>Shipping</span>
                                          <span>
                                            ${order.shipping.toFixed(2)}
                                          </span>
                                        </div>
                                        <div className='flex justify-between text-sm'>
                                          <span>Tax</span>
                                          <span>${order.tax.toFixed(2)}</span>
                                        </div>
                                        <Separator />
                                        <div className='flex justify-between font-medium'>
                                          <span>Total</span>
                                          <span>${order.total.toFixed(2)}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </ScrollArea>
                                <div className='flex justify-end gap-2 mt-4'>
                                  {order.status === 'Delivered' && (
                                    <Button variant='outline' size='sm'>
                                      <Download className='mr-2 h-4 w-4' />
                                      Download Invoice
                                    </Button>
                                  )}
                                  <DialogTrigger asChild>
                                    <Button variant='default' size='sm'>
                                      Close
                                    </Button>
                                  </DialogTrigger>
                                </div>
                              </DialogContent>
                            </Dialog>

                            {order.status === 'Delivered' && (
                              <Button variant='outline' size='sm'>
                                <Download className='mr-2 h-4 w-4' />
                                Invoice
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
