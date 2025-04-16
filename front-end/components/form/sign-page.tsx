'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignInForm from './sign-in';
import SignUpForm from './sign-up';

export default function SignInSignUp() {
  return (
    <Tabs defaultValue='login' className='w-full'>
      <TabsList className='grid w-full grid-cols-2 mb-4'>
        <TabsTrigger value='login'>Đăng nhập</TabsTrigger>
        <TabsTrigger value='register'>Đăng ký</TabsTrigger>
      </TabsList>
      <TabsContent value='login' className='space-y-6'>
        <SignInForm />
      </TabsContent>
      <TabsContent value='register' className='space-y-6'>
        <SignUpForm />
      </TabsContent>
    </Tabs>
  );
}
