'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

type Props = {
  prevStep: () => void;
  nextStep: () => void;
};

export default function PaymentInfo({ prevStep, nextStep }: Props) {
  const [selectedTab, setSelectedTab] = useState<string>('cod');

  const getButtonLabel: Record<string, string> = {
    cod: 'Tiếp tục với thanh toán khi nhận hàng',
    vnpay: 'Tiếp tục với VnPay',
    momo: 'Tiếp tục với Momo',
  };

  return (
    <div className='border rounded-lg p-6 space-y-6'>
      <h2 className='text-xl font-bold'>Phương thức thanh toán</h2>

      <Tabs defaultValue='cod' onValueChange={setSelectedTab}>
        <TabsList className='grid w-full grid-cols-3'>
          <TabsTrigger value='cod'>Thanh toán khi nhận hàng</TabsTrigger>
          <TabsTrigger value='vnpay'>VnPay</TabsTrigger>
          <TabsTrigger value='momo'>Momo</TabsTrigger>
        </TabsList>

        <TabsContent value='cod' className='space-y-6 pt-4'>
          <p className='text-muted-foreground text-center py-8'>
            Bạn sẽ thanh toán khi nhận hàng tại địa chỉ đã cung cấp.
          </p>
        </TabsContent>

        <TabsContent value='vnpay' className='space-y-6 pt-4'>
          <p className='text-muted-foreground text-center py-8'>
            Bạn sẽ được chuyển hướng đến VnPay để hoàn tất thanh toán.
          </p>
        </TabsContent>

        <TabsContent value='momo' className='space-y-6 pt-4'>
          <p className='text-muted-foreground text-center py-8'>
            Bạn sẽ được chuyển hướng đến Momo để hoàn tất thanh toán.
          </p>
        </TabsContent>
      </Tabs>

      <div className='pt-4 flex gap-4'>
        <Button variant='outline' onClick={prevStep} className='w-full'>
          Quay lại
        </Button>
        <Button onClick={nextStep} className='w-full'>
          {getButtonLabel[selectedTab] || 'Tiêp tục'}
        </Button>
      </div>
    </div>
  );
}
