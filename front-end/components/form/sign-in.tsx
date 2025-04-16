'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from '../../hooks/use-toast';
import { ApiRequest, ApiResponse } from '../../services/apiRequest';
import FacebookLogin from './facebook-login';
import GoogleLogin from './google-login';

const loginSchema = z.object({
  email: z.string().email('Vui lòng nhập email hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    watch: watchLogin,
    setValue: setLoginValue,
    formState: { errors: loginErrors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const handleLogin = async (data: LoginFormData) => {
    const { rememberMe, ...rest } = data;
    try {
      setIsLoading(true);
      const result = await ApiRequest<ApiResponse>(
        '/auth/sign-in',
        'POST',
        rest
      );
      if (result.success) {
        toast({
          title: 'Thành công',
          description: 'Đăng nhập thành công!',
        });
        if (rememberMe) {
          localStorage.setItem('token', result.data?.accessToken || '');
        } else {
          sessionStorage.setItem('token', result.data?.accessToken || '');
        }
        const role = result.data?.user?.role;
        if (role.name.toUpperCase() === 'ADMIN') {
          router.push('/admin');
        } else {
          router.push('/');
        }
      }
    } catch (err: any) {
      toast({
        title: 'Thất bại',
        description: err?.message || 'Có lỗi xảy ra!',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className='text-center space-y-2'>
        <h1 className='text-2xl font-bold'>Chào mừng trở lại</h1>
        <p className='text-muted-foreground'>
          Nhập thông tin để đăng nhập tài khoản
        </p>
      </div>
      <form
        onSubmit={handleLoginSubmit(handleLogin as any)}
        className='space-y-4'
      >
        <div className='space-y-2'>
          <Label>Email</Label>
          <Input {...loginRegister('email')} placeholder='email@example.com' />
          {loginErrors.email && (
            <small className='text-red-500'>
              {loginErrors.email.message as string}
            </small>
          )}
        </div>
        <div className='space-y-2'>
          <Label>Mật khẩu</Label>
          <Input
            type='password'
            {...loginRegister('password')}
            placeholder='••••••••'
          />
          {loginErrors.password && (
            <small className='text-red-500'>
              {loginErrors.password.message as string}
            </small>
          )}
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='remember'
              checked={watchLogin('rememberMe')}
              onCheckedChange={(checked) =>
                setLoginValue('rememberMe', checked)
              }
            />
            <Label htmlFor='remember' className='text-sm'>
              Ghi nhớ đăng nhập
            </Label>
          </div>
          <Link
            href='/forgot-password'
            className='text-sm text-primary hover:underline'
          >
            Quên mật khẩu?
          </Link>
        </div>
        <Button type='submit' className='w-full'>
          {isLoading ? <Loader2 className='animate-spin' /> : 'Đăng nhập'}
        </Button>
      </form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t'></span>
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Hoặc tiếp tục với
          </span>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <GoogleLogin />
        <FacebookLogin />
      </div>
    </>
  );
}
