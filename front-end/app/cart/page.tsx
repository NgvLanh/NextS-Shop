'use client';

import EmptyCart from '../../components/empty-cart';
import Footer from '../../components/footer';
import Header from '../../components/header';
import ItemsCart from '../../components/items-cart';
import { useCart } from '../../contexts/CartContext';

export default function CartPage() {
  const { cartItems } = useCart();

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1 mx-4'>
        <div className='container mx-auto py-8'>
          <h1 className='text-3xl font-bold mb-8'>Giỏ hàng</h1>

          {cartItems.length === 0 ? <EmptyCart /> : <ItemsCart />}
        </div>
      </main>
      <Footer />
    </div>
  );
}
