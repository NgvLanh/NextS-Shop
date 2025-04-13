'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Footer from '../../components/ui/footer';
import { toast } from '../../hooks/use-toast';
import { ApiRequest, ApiResponse } from '../../services/apiRequest';

const loginSchema = z.object({
  email: z.string().email('Vui lòng nhập email hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z
  .object({
    fullName: z.string().min(1, 'Họ tên không được để trống'),
    email: z.string().email('Email không hợp lệ'),
    phone: z
      .string()
      .regex(
        /^0[3|5|7|8][0-9]{8}$/,
        'Số điện thoại phải bắt đầu bằng 03 05 07 08 và có 10 chữ số'
      ),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: z.string(),
    agreedToTerms: z
      .boolean()
      .refine((value) => value, 'Bạn phải đồng ý với điều khoản dịch vụ'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu không khớp',
    path: ['confirmPassword'],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    watch: watchLogin,
    setValue: setLoginValue,
    formState: { errors: loginErrors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    watch: watchRegister,
    setValue: setRegisterValue,
    formState: { errors: registerErrors },
  } = useForm({ resolver: zodResolver(registerSchema) });

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

  const handleRegister = async (data: RegisterFormData) => {
    const { confirmPassword, agreedToTerms, ...rest } = data;
    try {
      setIsLoading(true);
      const result = await ApiRequest<ApiResponse>(
        '/auth/sign-up',
        'POST',
        rest
      );
      if (result.success) {
        toast({
          title: 'Thành công',
          description: 'Đăng ký thành công vui lòng vào email xác nhận!',
        });
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

  const handleGoogleLogin = () => {
    toast({
      title: 'Thành công',
      description: 'Đăng nhập thành công',
    });
  };

  const handleFacebookLogin = () => {
    toast({
      title: 'Thành công',
      description: 'Đăng nhập thành công',
    });
  };

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
          <Tabs defaultValue='login' className='w-full'>
            <TabsList className='grid w-full grid-cols-2 mb-4'>
              <TabsTrigger value='login'>Đăng nhập</TabsTrigger>
              <TabsTrigger value='register'>Đăng ký</TabsTrigger>
            </TabsList>
            <TabsContent value='login' className='space-y-6'>
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
                  <Input
                    {...loginRegister('email')}
                    placeholder='email@example.com'
                  />
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
                  {isLoading ? (
                    <Loader2 className='animate-spin' />
                  ) : (
                    'Đăng nhập'
                  )}
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
                <Button
                  type='button'
                  variant='outline'
                  onClick={handleGoogleLogin}
                >
                  Google
                </Button>
                <Button
                  type='button'
                  variant='outline'
                  onClick={handleFacebookLogin}
                >
                  Facebook
                </Button>
              </div>
            </TabsContent>
            <TabsContent value='register' className='space-y-6'>
              <div className='text-center space-y-2'>
                <h1 className='text-2xl font-bold'>Tạo tài khoản</h1>
                <p className='text-muted-foreground'>
                  Nhập thông tin để tạo tài khoản
                </p>
              </div>

              <form
                onSubmit={handleRegisterSubmit(handleRegister as any)}
                className='space-y-4'
              >
                <div className='space-y-2'>
                  <Label htmlFor='full-name'>Họ tên</Label>
                  <Input
                    id='full-name'
                    placeholder='Nguyen Lanh'
                    {...registerRegister('fullName')}
                  />
                  {registerErrors.fullName && (
                    <small className='text-red-500'>
                      {registerErrors.fullName.message as string}
                    </small>
                  )}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email-register'>Email</Label>
                  <Input
                    id='email-register'
                    type='email'
                    placeholder='email@example.com'
                    {...registerRegister('email')}
                  />
                  {registerErrors.email && (
                    <small className='text-red-500'>
                      {registerErrors.email.message as string}
                    </small>
                  )}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='phone-register'>Số điện thoại</Label>
                  <Input
                    id='phone-register'
                    type='text'
                    placeholder='039 xxx xxxx'
                    {...registerRegister('phone')}
                  />
                  {registerErrors.phone && (
                    <small className='text-red-500'>
                      {registerErrors.phone.message as string}
                    </small>
                  )}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='password-register'>Mật khẩu</Label>
                  <Input
                    id='password-register'
                    type='password'
                    placeholder='••••••••'
                    {...registerRegister('password')}
                  />
                  {registerErrors.password && (
                    <small className='text-red-500'>
                      {registerErrors.password.message as string}
                    </small>
                  )}
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='confirm-password'>Nhập lại mật khẩu</Label>
                  <Input
                    id='confirm-password'
                    type='password'
                    placeholder='••••••••'
                    {...registerRegister('confirmPassword')}
                  />
                  {registerErrors.confirmPassword && (
                    <small className='text-red-500'>
                      {registerErrors.confirmPassword.message as string}
                    </small>
                  )}
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='terms'
                    checked={watchRegister('agreedToTerms')}
                    onCheckedChange={(checked) => {
                      setRegisterValue('agreedToTerms', checked);
                    }}
                  />
                  <Label htmlFor='terms' className='text-sm'>
                    Tôi đồng ý với{' '}
                    <Link
                      href='/terms'
                      className='text-primary hover:underline'
                    >
                      Điều khoản sử dụng
                    </Link>{' '}
                    và{' '}
                    <Link
                      href='/privacy'
                      className='text-primary hover:underline'
                    >
                      Chính sách bảo mật
                    </Link>
                  </Label>
                </div>
                <Button type='submit' className='w-full'>
                  {isLoading ? <Loader2 className='animate-spin' /> : 'Đăng ký'}
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
                <Button
                  type='button'
                  variant='outline'
                  onClick={handleGoogleLogin}
                >
                  Google
                </Button>
                <Button
                  type='button'
                  variant='outline'
                  onClick={handleFacebookLogin}
                >
                  Facebook
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
