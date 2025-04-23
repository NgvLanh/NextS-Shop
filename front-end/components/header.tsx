'use client';
import { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { verifyToken } from '../services/authService';
import DesktopHeader from './desktop-header';
import MobileHeader from './mobile-header';

export default function Header() {
  const [isAuth, setIsAuth] = useState(false);
  const { setUser } = useUser();

  useEffect(() => {
    const verify = async () => {
      const token =
        localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        const result = await verifyToken();
        setUser(result.data);
        setIsAuth(result.success || false);
      }
    };
    verify();
  }, []);
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background'>
      <div className='container mx-auto h-16 flex items-center'>
        <DesktopHeader auth={isAuth} />
        <MobileHeader auth={isAuth} />
      </div>
    </header>
  );
}
