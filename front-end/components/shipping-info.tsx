'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUser } from '../contexts/UserContext';
import { toast } from '../hooks/use-toast';
import { DistrictType, ProvinceType, WardType } from '../lib/types';
import { ApiRequest, ApiResponse } from '../services/apiRequest';
import { Card, CardContent, CardHeader } from './ui/card';
import { Textarea } from './ui/textarea';

const schema = z.object({
  fullName: z.string().min(1, 'Họ tên không được bỏ trống'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ'),
  address: z.string().min(1, 'Địa chỉ không được bỏ trống'),
  province: z.string().min(1, 'Vui lòng chọn tỉnh/thành'),
  district: z.string().min(1, 'Vui lòng chọn quận/huyện'),
  ward: z.string().min(1, 'Vui lòng chọn phường/xã'),
});

type FormData = z.infer<typeof schema>;

type Props = {
  nextStep: () => void;
  shippingData?: any;
  setShippingData?: (data: any) => void;
};

export default function ShippingInfo({
  nextStep,
  shippingData,
  setShippingData,
}: Props) {
  const { user } = useUser();
  const [addresses, setAddresses] = useState<any[]>([]);
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
    fetchAddresses();
    fetchProvinces();
    if (user) {
      setValue('fullName', user?.fullName || '');
      setValue('phone', user?.phone || '');
      setShippingData &&
        setShippingData({
          fullName: user?.fullName || '',
          phone: user?.phone || '',
          address: '',
          province: '',
          district: '',
          ward: '',
        });
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

  const fetchAddresses = async () => {
    try {
      const result = await ApiRequest<ApiResponse>('addresses', 'GET');
      setAddresses(result.data);
    } catch (error) {
      console.log(error);
    }
  };

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
    try {
      const result = await ApiRequest<ApiResponse>('addresses', 'POST', data);
      if (result.success) {
        toast({
          title: 'Thành công',
          description: 'Thêm điểm giao hàng thành công!',
        });
        fetchAddresses();
        setShippingData && setShippingData(result.data);
        nextStep();
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: 'Thất bại',
        description: error.message || 'Thêm điểm giao hàng thất bại!',
        variant: 'destructive',
      });
    }
  };

  const selectedAddress = (address: any) => {
    setShippingData && setShippingData(address);
    console.log(address);

    nextStep();
  };

  return (
    <div className='border rounded-lg p-6 space-y-6'>
      <h2 className='text-xl font-bold'>Thông tin giao hàng</h2>

      <Tabs defaultValue='existing'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='existing'>Địa chỉ có sẵn</TabsTrigger>
          <TabsTrigger value='new'>Địa chỉ mới</TabsTrigger>
        </TabsList>
        <TabsContent value='existing' className='space-y-6 pt-4'>
          <div className='max-h-[420px] overflow-y-auto space-y-4 pr-2'>
            {user?.addresses?.map((address, index) => (
              <Card key={index}>
                <CardHeader className='flex pb-2 text-base font-semibold'>
                  {address.fullName}
                  <span className='text-sm font-normal text-muted-foreground'>
                    {address.phone}
                  </span>
                </CardHeader>
                <CardContent className='space-y-3 text-sm'>
                  <div className='flex flex-wrap gap-x-4 gap-y-1'>
                    <div className='flex items-center space-x-1'>
                      <span className='font-medium text-muted-foreground'>
                        Tỉnh:
                      </span>
                      <span>
                        {JSON.parse(address?.address?.province)?.label}
                      </span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <span className='font-medium text-muted-foreground'>
                        Huyện:
                      </span>
                      <span>
                        {JSON.parse(address?.address?.district)?.label}
                      </span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <span className='font-medium text-muted-foreground'>
                        Xã:
                      </span>
                      <span>{JSON.parse(address?.address?.ward)?.label}</span>
                    </div>
                  </div>

                  <p>
                    <span className='font-medium text-muted-foreground'>
                      Chi tiết:
                    </span>{' '}
                    {address?.address?.details}
                  </p>

                  <div className='flex'>
                    <Button
                      onClick={() => selectedAddress(address)}
                      className='flex-1'
                    >
                      Chọn địa chỉ này
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value='new' className='space-y-6 pt-4'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-2'>
              <Label htmlFor='fullName'>Họ tên</Label>
              <Input id='fullName' {...register('fullName')} />
              {errors.fullName && (
                <p className='text-red-500 text-sm'>
                  {errors.fullName.message}
                </p>
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
                    {provinces.map((province) => (
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
                    {districts.map((district) => (
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
                    {wards.map((ward) => (
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

            <Button type='submit' className='w-full'>
              Tiếp tục đến Thanh toán
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
