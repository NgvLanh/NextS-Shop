import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@radix-ui/react-label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../ui/input';

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, 'Mật khẩu hiện tại phải có ít nhất 6 ký tự'),
    newPassword: z.string().min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Xác nhận mật khẩu không khớp',
    path: ['confirmPassword'],
  });

type ChangePasswordData = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const handleChangePassword = (data: ChangePasswordData) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(handleChangePassword as any)}
      className='border rounded-lg p-6'
    >
      <h2 className='text-xl font-bold mb-6'>Đổi Mật Khẩu</h2>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='current-password'>Mật Khẩu Hiện Tại</Label>
          <Input
            id='current-password'
            type='password'
            {...register('currentPassword')}
          />
          {errors.currentPassword && (
            <small className='text-red-500'>
              {errors.currentPassword.message as string}
            </small>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='new-password'>Mật Khẩu Mới</Label>
          <Input
            id='new-password'
            type='password'
            {...register('newPassword')}
          />
          {errors.newPassword && (
            <small className='text-red-500'>
              {errors.newPassword.message as string}
            </small>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='confirm-password'>Xác Nhận Mật Khẩu Mới</Label>
          <Input
            id='confirm-password'
            type='password'
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <small className='text-red-500'>
              {errors.confirmPassword.message as string}
            </small>
          )}
        </div>

        <div className='pt-4'>
          <Button type='submit'>Cập Nhật Mật Khẩu</Button>
        </div>
      </div>
    </form>
  );
}
