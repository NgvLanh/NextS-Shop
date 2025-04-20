'use client';
import { useEffect, useState } from 'react';
import { verifyToken } from '../services/authService';
import DesktopHeader from './desktop-header';
import MobileHeader from './mobile-header';

export default function Header() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const result = await verifyToken();
      setIsAuth(result.success || false);
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
