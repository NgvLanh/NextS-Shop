'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  DistrictType,
  ProvinceType,
  UserType,
  WardType,
} from '../../lib/types';
import { ApiRequest, ApiResponse } from '../../services/apiRequest';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '../ui/textarea';
const schema = z.object({
  fullName: z.string().min(1, 'Họ tên không được bỏ trống'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  address: z.string().min(1, 'Địa chỉ không được bỏ trống'),
  province: z.string().min(1, 'Vui lòng chọn tỉnh/thành'),
  district: z.string().min(1, 'Vui lòng chọn quận/huyện'),
  ward: z.string().min(1, 'Vui lòng chọn phường/xã'),
});

type FormData = z.infer<typeof schema>;

type AddressFormProps = {
  user: UserType;
  onSubmitForm: (data: any) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
};
export default function AddressForm({
  user,
  onSubmitForm,
  isOpen,
  setIsOpen,
}: AddressFormProps) {
  const [provinces, setProvinces] = useState<ProvinceType[]>([]);
  const [districts, setDistricts] = useState<DistrictType[]>([]);
  const [wards, setWards] = useState<WardType[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: user?.fullName || '',
      phone: user?.phone || '',
      address: '',
      province: '',
      district: '',
      ward: '',
    },
  });

  const selectedProvince = watch('province');
  const selectedDistrict = watch('district');

  useEffect(() => {
    fetchProvinces();
    if (user) {
      setValue('fullName', user?.fullName || '');
      setValue('phone', user?.phone || '');
    }
  }, [user]);

  useEffect(() => {
    if (selectedProvince) {
      handleProvinceChange(selectedProvince);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      handleDistrictChange(selectedDistrict);
    }
  }, [selectedDistrict]);

  const fetchProvinces = async () => {
    try {
      const result = await ApiRequest<ApiResponse>(
        'addresses/provinces',
        'GET'
      );
      setProvinces(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProvinceChange = async (selectedProvince: any) => {
    try {
      const result = await ApiRequest<ApiResponse>(
        `addresses/districts/${JSON.parse(selectedProvince)?.value}`,
        'GET'
      );
      setDistricts(result.data);
      setValue('district', '');
      setValue('ward', '');
      setWards([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDistrictChange = async (selectedDistrict: any) => {
    try {
      const result = await ApiRequest<ApiResponse>(
        `addresses/wards/${JSON.parse(selectedDistrict)?.value}`,
        'GET'
      );
      setWards(result.data);
      setValue('ward', '');
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data$: FormData) => {
    handleNewAddress(data$);
  };

  const handleNewAddress = async (data$: FormData) => {
    const data = {
      fullName: data$.fullName,
      phone: data$.phone,
      address: {
        province: data$.province,
        district: data$.district,
        ward: data$.ward,
        details: data$.address,
      },
    };
    onSubmitForm(data);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Thêm địa chỉ mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin cho địa chỉ mới của bạn.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='fullName'>Họ tên</Label>
            <Input id='fullName' {...register('fullName')} />
            {errors.fullName && (
              <p className='text-red-500 text-sm'>{errors.fullName.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              value={user?.email}
              readOnly
              disabled
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='phone'>Số điện thoại</Label>
            <Input id='phone' type='tel' {...register('phone')} />
            {errors.phone && (
              <p className='text-red-500 text-sm'>{errors.phone.message}</p>
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='address'>Địa chỉ</Label>
            <Textarea id='address' {...register('address')} />
            {errors.address && (
              <p className='text-red-500 text-sm'>{errors.address.message}</p>
            )}
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='province'>Tỉnh/Thành</Label>
              <Select
                onValueChange={(value) => {
                  setValue('province', value);
                }}
              >
                <SelectTrigger id='province'>
                  <SelectValue placeholder='Chọn tỉnh/thành' />
                </SelectTrigger>
                <SelectContent>
                  {provinces?.map((province) => (
                    <SelectItem
                      value={JSON.stringify({
                        value: province.ProvinceID.toString(),
                        label: province.ProvinceName,
                      })}
                      key={province.ProvinceID}
                    >
                      {province.ProvinceName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.province && (
                <p className='text-red-500 text-sm'>
                  {errors.province.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='district'>Quận/Huyện</Label>
              <Select
                onValueChange={(value) => {
                  setValue('district', value);
                }}
              >
                <SelectTrigger id='district'>
                  <SelectValue placeholder='Chọn quận/huyện' />
                </SelectTrigger>
                <SelectContent>
                  {districts?.map((district) => (
                    <SelectItem
                      value={JSON.stringify({
                        value: district.DistrictID.toString(),
                        label: district.DistrictName,
                      })}
                      key={district.DistrictID}
                    >
                      {district.DistrictName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.district && (
                <p className='text-red-500 text-sm'>
                  {errors.district.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='ward'>Phường/Xã</Label>
              <Select
                onValueChange={(value) => {
                  setValue('ward', value);
                }}
              >
                <SelectTrigger id='ward'>
                  <SelectValue placeholder='Chọn phường/xã' />
                </SelectTrigger>
                <SelectContent>
                  {wards?.map((ward) => (
                    <SelectItem
                      value={JSON.stringify({
                        value: ward.WardCode,
                        label: ward.WardName,
                      })}
                      key={ward.WardCode}
                    >
                      {ward.WardName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.ward && (
                <p className='text-red-500 text-sm'>{errors.ward.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsOpen(false)}>
              Hủy
            </Button>
            <Button type='submit'>Lưu địa chỉ</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
