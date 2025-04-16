'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);
};

export default useAuth;
