'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
type Props = {
  prevStep: () => void;
  nextStep: () => void;
};

export default function PaymentInfo({ prevStep, nextStep }: Props) {
  return (
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
            <Input id='card-number' placeholder='1234 5678 9012 3456' />
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
              Bạn sẽ được chuyển hướng đến PayPal để hoàn tất thanh toán.
            </p>
            <Button variant='outline' className='w-full'>
              Tiếp tục với PayPal
            </Button>
          </div>
        </TabsContent>
        <TabsContent value='apple' className='space-y-6 pt-4'>
          <div className='text-center py-8'>
            <p className='text-muted-foreground mb-4'>
              Bạn sẽ được chuyển hướng đến Apple Pay để hoàn tất thanh toán.
            </p>
            <Button variant='outline' className='w-full'>
              Tiếp tục với Apple Pay
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className='pt-4 flex gap-4'>
        <Button variant='outline' onClick={prevStep} className='w-full'>
          Quay lại
        </Button>
        <Button onClick={nextStep} className='w-full'>
          Xem lại đơn hàng
        </Button>
      </div>
    </div>
  );
}
