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
import Footer from '../../components/footer';
import Header from '../../components/header';
import { Textarea } from '../../components/ui/textarea';
import { useCart } from '../../contexts/CartContext';
import { useUser } from '../../contexts/UserContext';
import { formatCurrencyVND } from '../../lib/utils';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { cartItems } = useCart();
  const { user } = useUser();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.variant?.price * item.quantity,
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
          <h1 className='text-3xl font-bold mb-8'>Thanh toán</h1>

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
                Giao hàng
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
                Thanh toán
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
                Xem lại
              </span>
            </div>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            <div className='md:col-span-2'>
              {step === 1 && (
                <div className='border rounded-lg p-6 space-y-6'>
                  <h2 className='text-xl font-bold'>Thông tin giao hàng</h2>

                  <Tabs defaultValue='existing'>
                    <TabsList className='grid w-full grid-cols-2'>
                      <TabsTrigger value='existing'>Địa chỉ có sẵn</TabsTrigger>
                      <TabsTrigger value='new'>Địa chỉ mới</TabsTrigger>
                    </TabsList>
                    <TabsContent value='existing' className='space-y-6 pt-4'>
                      <div className='space-y-4'>
                        {user?.addresses?.map((address, index) => (
                          <div key={index} className='border p-4 rounded-lg'>
                            <p>{address.fullName}</p>
                            <p>
                              {address.ward}, {address.district}, {address.city}
                            </p>
                            <p>{address.phone}</p>
                            <Button onClick={nextStep} className='w-full mt-2'>
                              Chọn địa chỉ này
                            </Button>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    <TabsContent value='new' className='space-y-6 pt-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='full-name'>Họ tên</Label>
                        <Input
                          id='full-name'
                          placeholder='Nguyen Lanh'
                          defaultValue={user?.fullName}
                        />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                          id='email'
                          type='email'
                          placeholder='nguyen.lanh@example.com'
                          defaultValue={user?.email}
                          readOnly
                          disabled
                        />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='phone'>Số điện thoại</Label>
                        <Input
                          id='phone'
                          type='tel'
                          placeholder='+84 123 456 789'
                          defaultValue={user?.phone}
                        />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='address'>Địa chỉ</Label>
                        <Textarea id='address' placeholder='123 Đường Chính' />
                      </div>

                      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div className='space-y-2'>
                          <Label htmlFor='city'>Thành phố</Label>
                          <Input id='city' placeholder='Hà Nội' />
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='state'>Tỉnh/Thành</Label>
                          <Select>
                            <SelectTrigger id='state'>
                              <SelectValue placeholder='Chọn tỉnh/thành' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='hn'>Hà Nội</SelectItem>
                              <SelectItem value='hcm'>Hồ Chí Minh</SelectItem>
                              <SelectItem value='dn'>Đà Nẵng</SelectItem>
                              <SelectItem value='ct'>Cần Thơ</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className='space-y-2'>
                          <Label htmlFor='zip'>Mã bưu chính</Label>
                          <Input id='zip' placeholder='100000' />
                        </div>
                      </div>

                      <div className='pt-4'>
                        <Button onClick={nextStep} className='w-full'>
                          Tiếp tục đến Thanh toán
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {step === 2 && (
                <div className='border rounded-lg p-6 space-y-6'>
                  <h2 className='text-xl font-bold'>Phương thức thanh toán</h2>

                  <Tabs defaultValue='card'>
                    <TabsList className='grid w-full grid-cols-3'>
                      <TabsTrigger value='card'>Thẻ tín dụng</TabsTrigger>
                      <TabsTrigger value='paypal'>PayPal</TabsTrigger>
                      <TabsTrigger value='apple'>Apple Pay</TabsTrigger>
                    </TabsList>
                    <TabsContent value='card' className='space-y-6 pt-4'>
                      <div className='space-y-2'>
                        <Label htmlFor='card-name'>Tên trên thẻ</Label>
                        <Input id='card-name' placeholder='Nguyễn Văn A' />
                      </div>

                      <div className='space-y-2'>
                        <Label htmlFor='card-number'>Số thẻ</Label>
                        <Input
                          id='card-number'
                          placeholder='1234 5678 9012 3456'
                        />
                      </div>

                      <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                          <Label htmlFor='expiry'>Ngày hết hạn</Label>
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
                          Bạn sẽ được chuyển hướng đến PayPal để hoàn tất thanh
                          toán.
                        </p>
                        <Button variant='outline' className='w-full'>
                          Tiếp tục với PayPal
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value='apple' className='space-y-6 pt-4'>
                      <div className='text-center py-8'>
                        <p className='text-muted-foreground mb-4'>
                          Bạn sẽ được chuyển hướng đến Apple Pay để hoàn tất
                          thanh toán.
                        </p>
                        <Button variant='outline' className='w-full'>
                          Tiếp tục với Apple Pay
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
                      Quay lại
                    </Button>
                    <Button onClick={nextStep} className='w-full'>
                      Xem lại đơn hàng
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className='border rounded-lg p-6 space-y-6'>
                  <h2 className='text-xl font-bold'>Xem lại đơn hàng</h2>

                  <div className='space-y-4'>
                    <div className='border-b pb-4'>
                      <h3 className='font-medium mb-2'>Thông tin giao hàng</h3>
                      <p>Nguyễn Văn A</p>
                      <p>123 Đường Chính, Tầng 4B</p>
                      <p>Hà Nội, 100000</p>
                      <p>Việt Nam</p>
                      <p>nguyen.vana@example.com</p>
                      <p>+84 123 456 789</p>
                    </div>

                    <div className='border-b pb-4'>
                      <h3 className='font-medium mb-2'>
                        Phương thức thanh toán
                      </h3>
                      <div className='flex items-center gap-2'>
                        <CreditCard className='h-5 w-5' />
                        <span>Thẻ tín dụng kết thúc bằng 3456</span>
                      </div>
                    </div>

                    <div>
                      <h3 className='font-medium mb-2'>Sản phẩm</h3>
                      <div className='space-y-4'>
                        {cartItems.map((item) => (
                          <div key={item.id} className='flex gap-4'>
                            <div className='w-16 h-16 rounded-md overflow-hidden'>
                              <Image
                                src={
                                  item.variant?.imageUrl || '/placeholder.svg'
                                }
                                alt={
                                  item.variant?.product?.name || 'Ảnh sản phẩm'
                                }
                                width={64}
                                height={64}
                                className='object-cover w-full h-full'
                              />
                            </div>
                            <div className='flex-1'>
                              <h4 className='font-medium'>
                                {item.variant?.product?.name}
                              </h4>
                              <p className='text-sm text-muted-foreground'>
                                Số lượng: {item.quantity}
                              </p>
                            </div>
                            <div className='text-right'>
                              <p className='font-medium'>
                                {formatCurrencyVND(
                                  item.variant?.price * item.quantity
                                )}
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
                      Quay lại
                    </Button>
                    <Button className='w-full'>Đặt hàng</Button>
                  </div>
                </div>
              )}
            </div>

            <div className='md:col-span-1'>
              <div className='border rounded-lg p-6 space-y-6 sticky top-20'>
                <h2 className='text-lg font-bold mb-4'>Tóm tắt đơn hàng</h2>

                <div className='space-y-4'>
                  {cartItems.map((item) => (
                    <div key={item.id} className='flex gap-4'>
                      <div className='w-16 h-16 rounded-md overflow-hidden'>
                        <Image
                          src={item.variant?.imageUrl || '/placeholder.svg'}
                          alt={item.variant?.product?.name || `Ảnh sản phẩm`}
                          width={64}
                          height={64}
                          className='object-cover w-full h-full'
                        />
                      </div>
                      <div className='flex-1'>
                        <h4 className='font-medium'>
                          {item.variant?.product?.name}
                        </h4>
                        <p className='text-sm text-muted-foreground'>
                          SL: {item.quantity}
                        </p>
                      </div>
                      <div className='text-right'>
                        <p className='font-medium'>
                          {formatCurrencyVND(
                            item.variant?.price * item.quantity
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='border-t pt-4 space-y-2'>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Tạm tính</span>
                    <span>{formatCurrencyVND(subtotal)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Phí giao hàng</span>
                    <span>{formatCurrencyVND(shipping)}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-muted-foreground'>Thuế</span>
                    <span>{formatCurrencyVND(tax)}</span>
                  </div>
                  <div className='border-t pt-2 mt-2'>
                    <div className='flex justify-between font-bold'>
                      <span>Tổng cộng</span>
                      <span>{formatCurrencyVND(total)}</span>
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
