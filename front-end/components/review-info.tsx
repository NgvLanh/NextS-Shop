// Hiện tại không sử dụng

import { CreditCard } from 'lucide-react';
import { formatCurrencyVND } from '../lib/utils';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { CartItemsType } from '../lib/types';
type Props = {
  cartItems: CartItemsType[];
  prevStep: () => void;
};

export default function ReviewInfo({ cartItems, prevStep }: Props) {
  return (
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
          <h3 className='font-medium mb-2'>Phương thức thanh toán</h3>
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
                    src={item.variant?.imageUrl || '/placeholder.svg'}
                    alt={item.variant?.product?.name || 'Ảnh sản phẩm'}
                    width={64}
                    height={64}
                    className='object-cover w-full h-full'
                  />
                </div>
                <div className='flex-1'>
                  <h4 className='font-medium'>{item.variant?.product?.name}</h4>
                  <p className='text-sm text-muted-foreground'>
                    Số lượng: {item.quantity}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='font-medium'>
                    {formatCurrencyVND(item.variant?.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='pt-4 flex gap-4'>
        <Button variant='outline' onClick={prevStep} className='w-full'>
          Quay lại
        </Button>
        <Button className='w-full'>Đặt hàng</Button>
      </div>
    </div>
  );
}
