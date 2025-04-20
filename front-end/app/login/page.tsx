'use client';

import Link from 'next/link';
import Footer from '../../components/footer';
import SignInSignUp from '../../components/form/sign-page';

export default function LoginPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <header className='w-full border-b bg-background'>
        <div className='container mx-auto flex h-16 items-center'>
          <Link href='/' className='font-bold text-xl'>
            NextS
          </Link>
        </div>
      </header>
      <main className='flex-1 flex items-center justify-center py-12'>
        <div className='w-full max-w-md mx-auto px-4'>
          <SignInSignUp />
        </div>
      </main>
      <Footer />
    </div>
  );
}
