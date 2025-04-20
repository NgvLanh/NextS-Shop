'use client';
import { Button } from '@/components/ui/button';

import { Tabs, TabsContent } from '@/components/ui/tabs';
import {
  Clock,
  CreditCard,
  Heart,
  LogOut,
  MapPin,
  Package,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import Footer from '../../components/footer';
import AccountForm from '../../components/form/account';
import AvatarForm from '../../components/form/avatar';
import ChangePasswordForm from '../../components/form/change-password';
import Header from '../../components/header';
import { toast } from '../../hooks/use-toast';
import { UserType } from '../../lib/types';
import { ApiRequest, ApiResponse } from '../../services/apiRequest';
import { verifyToken } from '../../services/authService';

export default function AccountPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserType | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const result = await verifyToken();
      setProfile(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleupdateProfile = async (data: UserType | null | FieldValues) => {
    try {
      const result = await ApiRequest<ApiResponse>(`auth/profile`, 'PUT', data);
      setProfile(result.data);
      toast({
        title: 'Thành công',
        description: 'Cập nhật thông tin thành công!',
      });
    } catch (error) {
      toast({
        title: 'Thất bại',
        description: 'Cập nhật thông tin Thất bại!',
        variant: 'destructive',
      });
      console.log(error);
    }
  };

  const handleupdateAvatar = async (imageUrl: string) => {
    try {
      toast({
        title: 'Đang cập nhật ...',
        description: 'Vui lòng đợi vài giây!',
      });
      const result = await ApiRequest<ApiResponse>(`auth/avatar`, 'PUT', {
        avatarUrl: imageUrl,
      });
      setProfile(result.data);
      toast({
        title: 'Thành công',
        description: 'Cập nhật avatar thành công!',
      });
    } catch (error) {
      toast({
        title: 'Thất bại',
        description: 'Cập nhật avatar Thất bại!',
        variant: 'destructive',
      });
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    router.push('/');
  };

  // Mock orders data
  const orders = [
    {
      id: 'ORD-12345',
      date: '2023-05-15',
      status: 'Delivered',
      total: 249.97,
      items: 3,
    },
    {
      id: 'ORD-12346',
      date: '2023-04-28',
      status: 'Processing',
      total: 149.99,
      items: 1,
    },
    {
      id: 'ORD-12347',
      date: '2023-03-10',
      status: 'Delivered',
      total: 79.99,
      items: 1,
    },
  ];

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
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1'>
        <div className='container mx-auto py-8'>
          <h1 className='text-3xl font-bold mb-8'>Thông tin tài khoản</h1>

          <div className='grid md:grid-cols-4 gap-8'>
            <div className='md:col-span-1'>
              <div className='border rounded-lg overflow-hidden'>
                <div className='bg-muted p-6 flex flex-col items-center'>
                  <AvatarForm user={profile} onSubmit={handleupdateAvatar} />
                  <h2 className='font-bold text-lg'>
                    {profile && profile.fullName}
                  </h2>
                  <p className='text-sm text-muted-foreground'>
                    {profile && profile.email}
                  </p>
                </div>
                <div className='p-4'>
                  <nav className='flex flex-col space-y-1'>
                    <Link
                      href='/account'
                      className='flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-muted'
                    >
                      <User className='h-4 w-4' />
                      Thông tin
                    </Link>
                    <Link
                      href='/account/orders'
                      className='flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted'
                    >
                      <Package className='h-4 w-4' />
                      Đặt hàng
                    </Link>
                    <Link
                      href='/account/wishlist'
                      className='flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted'
                    >
                      <Heart className='h-4 w-4' />
                      Yêu thích
                    </Link>
                    <Link
                      href='/account/addresses'
                      className='flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted'
                    >
                      <MapPin className='h-4 w-4' />
                      Địa chỉ
                    </Link>
                    <Link
                      href='/account/payment'
                      className='flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted'
                    >
                      <CreditCard className='h-4 w-4' />
                      Phương thức thanh toán
                    </Link>
                  </nav>
                </div>
                <div className='p-4 border-t'>
                  <Button
                    variant='ghost'
                    className='w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50'
                    onClick={handleLogout}
                  >
                    <LogOut className='h-4 w-4 mr-2' />
                    Đăng xuất
                  </Button>
                </div>
              </div>
            </div>

            <div className='md:col-span-3'>
              <Tabs defaultValue='profile'>
                <TabsContent value='profile' className='space-y-6'>
                  <AccountForm data={profile} onSubmit={handleupdateProfile} />
                  <ChangePasswordForm user={profile} />
                </TabsContent>

                <TabsContent value='orders' className='space-y-6'>
                  <div className='border rounded-lg overflow-hidden'>
                    <h2 className='text-xl font-bold p-6 border-b'>
                      Order History
                    </h2>

                    {orders.length === 0 ? (
                      <div className='text-center py-12'>
                        <div className='mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-muted mb-6'>
                          <Package className='h-12 w-12 text-muted-foreground' />
                        </div>
                        <h3 className='text-lg font-medium mb-2'>
                          No orders yet
                        </h3>
                        <p className='text-muted-foreground mb-6'>
                          You haven't placed any orders yet.
                        </p>
                        <Link href='/products'>
                          <Button>Start Shopping</Button>
                        </Link>
                      </div>
                    ) : (
                      <div className='divide-y'>
                        {orders.map((order) => (
                          <div key={order.id} className='p-6'>
                            <div className='flex flex-col sm:flex-row justify-between mb-4'>
                              <div>
                                <h3 className='font-medium'>{order.id}</h3>
                                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                                  <Clock className='h-3 w-3' />
                                  <span>{order.date}</span>
                                </div>
                              </div>
                              <div className='mt-2 sm:mt-0 sm:text-right'>
                                <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold'>
                                  {order.status}
                                </div>
                                <p className='text-sm text-muted-foreground mt-1'>
                                  {order.items}{' '}
                                  {order.items === 1 ? 'item' : 'items'}
                                </p>
                              </div>
                            </div>
                            <div className='flex justify-between items-center'>
                              <p className='font-medium'>
                                ${order.total.toFixed(2)}
                              </p>
                              <Link href={`/orders/${order.id}`}>
                                <Button variant='outline' size='sm'>
                                  View Order
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value='wishlist' className='space-y-6'>
                  <div className='border rounded-lg overflow-hidden'>
                    <h2 className='text-xl font-bold p-6 border-b'>
                      My Wishlist
                    </h2>

                    {wishlist.length === 0 ? (
                      <div className='text-center py-12'>
                        <div className='mx-auto w-24 h-24 flex items-center justify-center rounded-full bg-muted mb-6'>
                          <Heart className='h-12 w-12 text-muted-foreground' />
                        </div>
                        <h3 className='text-lg font-medium mb-2'>
                          Your wishlist is empty
                        </h3>
                        <p className='text-muted-foreground mb-6'>
                          Save items you like to your wishlist.
                        </p>
                        <Link href='/products'>
                          <Button>Explore Products</Button>
                        </Link>
                      </div>
                    ) : (
                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 p-6'>
                        {wishlist.map((item) => (
                          <div
                            key={item.id}
                            className='border rounded-lg overflow-hidden'
                          >
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
                                <Button
                                  size='sm'
                                  variant='outline'
                                  className='flex-1'
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value='addresses' className='space-y-6'>
                  <div className='border rounded-lg overflow-hidden'>
                    <div className='flex justify-between items-center p-6 border-b'>
                      <h2 className='text-xl font-bold'>My Addresses</h2>
                      <Button size='sm'>Add New Address</Button>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
                      <div className='border rounded-lg p-4 relative'>
                        <div className='absolute top-4 right-4 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold'>
                          Default
                        </div>
                        <h3 className='font-medium mb-2'>Home</h3>
                        <p className='text-sm text-muted-foreground'>
                          John Doe
                          <br />
                          123 Main St, Apt 4B
                          <br />
                          New York, NY 10001
                          <br />
                          United States
                          <br />
                          +1 (555) 123-4567
                        </p>
                        <div className='flex gap-2 mt-4'>
                          <Button size='sm' variant='outline'>
                            Edit
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            className='text-red-500 hover:text-red-600 hover:bg-red-50'
                          >
                            Delete
                          </Button>
                        </div>
                      </div>

                      <div className='border rounded-lg p-4'>
                        <h3 className='font-medium mb-2'>Work</h3>
                        <p className='text-sm text-muted-foreground'>
                          John Doe
                          <br />
                          456 Office Blvd, Suite 100
                          <br />
                          New York, NY 10002
                          <br />
                          United States
                          <br />
                          +1 (555) 987-6543
                        </p>
                        <div className='flex gap-2 mt-4'>
                          <Button size='sm' variant='outline'>
                            Edit
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            className='text-red-500 hover:text-red-600 hover:bg-red-50'
                          >
                            Delete
                          </Button>
                          <Button size='sm' variant='outline'>
                            Set as Default
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value='payment' className='space-y-6'>
                  <div className='border rounded-lg overflow-hidden'>
                    <div className='flex justify-between items-center p-6 border-b'>
                      <h2 className='text-xl font-bold'>Payment Methods</h2>
                      <Button size='sm'>Add New Card</Button>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
                      <div className='border rounded-lg p-4 relative'>
                        <div className='absolute top-4 right-4 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold'>
                          Default
                        </div>
                        <div className='flex items-center gap-4'>
                          <div className='w-12 h-8 bg-muted rounded'></div>
                          <div>
                            <h3 className='font-medium'>Visa ending in 1234</h3>
                            <p className='text-sm text-muted-foreground'>
                              Expires 12/25
                            </p>
                          </div>
                        </div>
                        <div className='flex gap-2 mt-4'>
                          <Button size='sm' variant='outline'>
                            Edit
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            className='text-red-500 hover:text-red-600 hover:bg-red-50'
                          >
                            Delete
                          </Button>
                        </div>
                      </div>

                      <div className='border rounded-lg p-4'>
                        <div className='flex items-center gap-4'>
                          <div className='w-12 h-8 bg-muted rounded'></div>
                          <div>
                            <h3 className='font-medium'>
                              Mastercard ending in 5678
                            </h3>
                            <p className='text-sm text-muted-foreground'>
                              Expires 06/24
                            </p>
                          </div>
                        </div>
                        <div className='flex gap-2 mt-4'>
                          <Button size='sm' variant='outline'>
                            Edit
                          </Button>
                          <Button
                            size='sm'
                            variant='outline'
                            className='text-red-500 hover:text-red-600 hover:bg-red-50'
                          >
                            Delete
                          </Button>
                          <Button size='sm' variant='outline'>
                            Set as Default
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
