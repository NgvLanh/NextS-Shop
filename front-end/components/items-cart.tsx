'use client';

import { ArrowRight, Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { formatCurrencyVND } from '../lib/utils';
import { ApiRequest, ApiResponse } from '../services/apiRequest';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';

export default function ItemsCart() {
  const { cartItems, setCartItems } = useCart();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const result = await ApiRequest<ApiResponse>('carts', 'GET');
      setCartItems(result.data.cartItems);
    } catch (error) {
      console.error(error);
    }
  };

  const updateQuantity = async (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    const result = await ApiRequest<ApiResponse>(`carts/${id}`, 'PATCH', {
      method: 'PATCH',
      quantity: newQuantity,
    });
    if (result.success) {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = async (id: number) => {
    const result = await ApiRequest<ApiResponse>(`carts/${id}`, 'PATCH', {
      method: 'DELETE',
    });
    if (result.success) {
      setCartItems(cartItems.filter((item) => item.id !== id));
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  const isAllSelected =
    cartItems.length > 0 && selectedItems.length === cartItems.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map((item) => item.id));
    }
  };

  const toggleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.variant?.price * item.quantity,
    0
  );
  const shipping = 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className='grid md:grid-cols-3 gap-8'>
      <div className='md:col-span-2'>
        <div className='border rounded-lg overflow-hidden'>
          <div className='hidden sm:grid grid-cols-12 gap-4 p-4 bg-muted text-sm font-medium'>
            <div className='col-span-1'>
              <Checkbox
                id='select-all'
                checked={isAllSelected}
                onCheckedChange={toggleSelectAll}
              />
            </div>
            <div className='col-span-5'>Sản phẩm</div>
            <div className='col-span-2 text-center'>Giá tiền</div>
            <div className='col-span-2 text-center'>Số lượng</div>
            <div className='col-span-2 text-right'>Tổng tiền</div>
          </div>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className='grid grid-cols-1 sm:grid-cols-12 gap-4 p-4 border-t first:border-t-0 items-center'
            >
              <div className='col-span-1 hidden sm:block'>
                <Checkbox
                  id={`checkbox-${item.id}`}
                  checked={selectedItems.includes(item.id)}
                  onCheckedChange={() => toggleSelectItem(item.id)}
                />
              </div>

              <div className='col-span-12 sm:col-span-5 flex items-start gap-4'>
                <div className='w-20 h-20 rounded-md overflow-hidden'>
                  <Image
                    src={item.variant?.imageUrl || '/placeholder.svg'}
                    alt={item.variant?.product?.name || 'Ảnh sản phẩm'}
                    width={80}
                    height={80}
                    className='object-cover w-full h-full'
                  />
                </div>
                <div className='flex-1'>
                  <h3 className='font-medium'>{item.variant?.product?.name}</h3>
                  <button
                    onClick={() => removeItem(item.id)}
                    className='text-sm text-red-500 flex items-center mt-1'
                  >
                    <Trash2 className='h-3 w-3 mr-1' />
                    Xoá
                  </button>
                  <div className='sm:hidden mt-2'>
                    <span className='font-medium mr-2'>Giá:</span>
                    {formatCurrencyVND(item.variant?.price)}
                  </div>
                </div>
              </div>

              <div className='col-span-12 sm:col-span-2 text-center hidden sm:block'>
                {formatCurrencyVND(item.variant?.price)}
              </div>

              <div className='col-span-12 sm:col-span-2 flex justify-center'>
                <div className='flex items-center'>
                  <Button
                    variant='outline'
                    size='icon'
                    className='h-8 w-8'
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className='h-3 w-3' />
                  </Button>
                  <span className='w-10 text-center'>{item.quantity}</span>
                  <Button
                    variant='outline'
                    size='icon'
                    className='h-8 w-8'
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className='h-3 w-3' />
                  </Button>
                </div>
              </div>

              <div className='col-span-12 sm:col-span-2 text-right font-medium'>
                <span className='sm:hidden font-medium mr-2'>Tổng:</span>
                {formatCurrencyVND(item.variant?.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div className='flex flex-col sm:flex-row justify-between items-center mt-6 gap-4'>
          <div className='flex w-full sm:w-auto'>
            <Input placeholder='Coupon code' className='rounded-r-none' />
            <Button className='rounded-l-none'>Áp dụng</Button>
          </div>
          <Button variant='outline' asChild>
            <Link href='/products'>Tiếp tục mua sắm</Link>
          </Button>
        </div>
      </div>

      <div className='md:col-span-1'>
        <div className='border rounded-lg p-6 space-y-6 sticky top-20'>
          <h2 className='text-lg font-bold mb-4'>Hoá đơn</h2>

          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Tạm tính</span>
              <span>{formatCurrencyVND(subtotal)}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-muted-foreground'>Phí giao hàng</span>
              <span>{formatCurrencyVND(shipping)}</span>
            </div>
            <div className='border-t pt-2 mt-2'>
              <div className='flex justify-between font-bold'>
                <span>Tổng tiền</span>
                <span>{formatCurrencyVND(total)}</span>
              </div>
            </div>
          </div>

          <Button
            className={`w-full `}
            size='lg'
            disabled={selectedItems.length === 0}
            onClick={() => {
              if (selectedItems.length > 0) {
                //
                router.push('/checkout');
              } else {
                alert('Vui lòng chọn ít nhất một sản phẩm để thanh toán!');
              }
            }}
          >
            Tiếp tục thanh toán
            <ArrowRight className='ml-2 h-4 w-4' />
          </Button>

          <div className='text-xs text-muted-foreground text-center'>
            <p>Các phương thức thanh toán hiện có</p>
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
  );
}
