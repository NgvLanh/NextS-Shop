'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { UserType } from '../../lib/types';

const profileSchema = z.object({
  fullName: z.string().min(1, 'Họ tên không được để trống'),
  phone: z
    .string()
    .regex(
      /^0[3|5|7|8][0-9]{8}$/,
      'Số điện thoại phải bắt đầu bằng 03 05 07 08 và có 10 chữ số'
    ),
});

type ProfileData = z.infer<typeof profileSchema>;

type AccountFormProps = {
  data: UserType | null;
  onSubmit: (id: number, data: ProfileData | null | FieldValues) => void;
};

export default function AccountForm({ data, onSubmit }: AccountFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: data?.fullName || '',
      phone: data?.phone || '',
    },
  });

  const [profile, setProfile] = useState<UserType | null>(data);

  useEffect(() => {
    if (data) {
      reset({
        fullName: data.fullName,
        phone: data.phone,
      });
      setProfile(data);
    }
  }, [data, reset]);

  const handleupdateProfile = async (
    id: number,
    data: ProfileData | null | FieldValues
  ) => {
    onSubmit(id, data);
  };
  return (
    <form
      onSubmit={handleSubmit(
        (data) => handleupdateProfile(profile?.id ?? 0, data) as any
      )}
      className='border rounded-lg p-6'
    >
      <h2 className='text-xl font-bold mb-6'>Thông Tin Hồ Sơ</h2>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='full-name'>Họ tên</Label>
          <Input {...register('fullName')} defaultValue={profile?.fullName} />
          {errors.fullName && (
            <small className='text-red-500'>
              {errors.fullName.message as string}
            </small>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='email'>Email</Label>

          <Input
            id='email'
            type='email'
            defaultValue={profile?.email}
            readOnly
            disabled
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='phone'>Số Điện Thoại</Label>
          <Input
            {...register('phone')}
            type='tel'
            defaultValue={profile?.phone}
          />
          {errors.phone && (
            <small className='text-red-500'>
              {errors.phone.message as string}
            </small>
          )}
        </div>

        <div className='pt-4'>
          <Button type='submit'>Lưu Thay Đổi</Button>
        </div>
      </div>
    </form>
  );
}
