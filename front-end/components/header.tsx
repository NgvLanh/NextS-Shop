'use client';
import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import { ApiRequest, ApiResponse } from '../services/apiRequest';
import { verifyToken } from '../services/authService';
import DesktopHeader from './desktop-header';
import MobileHeader from './mobile-header';

export default function Header() {
  const [isAuth, setIsAuth] = useState(false);
  const { setUser } = useUser();
  const { cartItems, setCartItems } = useCart();

  useEffect(() => {
    verify();
    fetchCart();
  }, []);
  const verify = async () => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      try {
        const result = await verifyToken();
        if (result.success) {
          setUser(result.data);
          setIsAuth(true);
        }
      } catch (error) {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
      }
    }
  };
  const fetchCart = async () => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      const result = await ApiRequest<ApiResponse>('/carts', 'GET');
      if (result.success) {
        setCartItems(result.data.cartItems);
      }
    }
  };
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background'>
      <div className='container mx-auto h-16 flex items-center'>
        <DesktopHeader auth={isAuth} cartItemCount={cartItemCount} />
        <MobileHeader auth={isAuth} cartItemCount={cartItemCount} />
      </div>
    </header>
  );
}
