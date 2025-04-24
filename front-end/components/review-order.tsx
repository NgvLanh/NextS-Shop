import Image from 'next/image';
import { CartItemsType } from '../lib/types';
import { formatCurrencyVND } from '../lib/utils';
type Props = {
  cartItems: CartItemsType[];
};
export default function ReviewOrder({ cartItems }: Props) {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.variant?.price * item.quantity,
    0
  );
  const shipping = 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
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
              <h4 className='font-medium'>{item.variant?.product?.name}</h4>
              <p className='text-sm text-muted-foreground'>
                SL: {item.quantity}
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
  );
}
