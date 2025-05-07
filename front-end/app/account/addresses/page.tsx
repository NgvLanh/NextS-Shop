'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AddressForm from '../../../components/form/address';
import { Card, CardContent, CardHeader } from '../../../components/ui/card';
import { useUser } from '../../../contexts/UserContext';
import { toast } from '../../../hooks/use-toast';
import { ApiRequest, ApiResponse } from '../../../services/apiRequest';

export default function AddressesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<number | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);

  const { user } = useUser();
  const [addresses, setAddresses] = useState<any[]>([]);

  const fetchAddresses = async () => {
    try {
      const result = await ApiRequest<ApiResponse>('addresses', 'GET');
      setAddresses(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewAddress = async (data$: any) => {
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

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleEditAddress = (id: number) => {
    setAddressToEdit(id);
    setIsEditDialogOpen(true);
  };

  const handleDeleteAddress = (id: number) => {
    setAddressToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (addressToDelete !== null) {
      try {
        const result = await ApiRequest<ApiResponse>('', 'DELETE');
        if (result.success) {
          setAddresses(
            addresses.filter((address) => address.id !== addressToDelete)
          );
          setAddressToDelete(null);
          toast({
            title: 'Thành công',
            description: result?.message,
          });
        }
      } catch (error: any) {
        toast({
          title: 'Lỗi',
          description: error?.message,
          variant: 'destructive',
        });
      } finally {
        setIsDeleteDialogOpen(false);
      }
    }
  };

  const setAsDefault = (id: number) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  return (
    <div className='container mx-auto py-8'>
      <div className='flex items-center gap-4 mb-8'>
        <Link href='/account'>
          <Button variant='ghost' size='icon'>
            <ArrowLeft className='h-5 w-5' />
          </Button>
        </Link>
        <h1 className='text-3xl font-bold'>Địa chỉ của tôi</h1>
      </div>

      <div className='border rounded-lg overflow-hidden'>
        <div className='flex justify-between items-center p-6 border-b'>
          <h2 className='text-xl font-bold'>Địa chỉ giao hàng & thanh toán</h2>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className='h-4 w-4 mr-2' />
            Thêm địa chỉ mới
          </Button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
          {addresses.map((address) => (
            <div key={address.id} className='border rounded-lg p-4 relative'>
              {address.isDefault && (
                <div
                  className='absolute top-4 right-4 inline-flex items-center
                 rounded-full border px-2.5 py-0.5 text-xs font-semibold'
                >
                  Mặc định
                </div>
              )}
              <h3 className='font-medium mb-2'>
                <Card className='border-none shadow-none'>
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
                  </CardContent>
                </Card>
              </h3>
              <div className='flex gap-2 mt-4'>
                <Button
                  size='sm'
                  variant='outline'
                  onClick={() => handleEditAddress(address.id)}
                >
                  Chỉnh sửa
                </Button>
                <Button
                  size='sm'
                  variant='outline'
                  className='text-red-500 hover:text-red-600 hover:bg-red-50'
                  onClick={() => handleDeleteAddress(address.id)}
                >
                  Xóa
                </Button>
                {!address.isDefault && (
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => setAsDefault(address.id)}
                  >
                    Đặt làm mặc định
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hộp thoại Thêm địa chỉ */}
      <AddressForm
        isOpen={isAddDialogOpen}
        user={user}
        setIsOpen={setIsAddDialogOpen}
        onSubmitForm={handleNewAddress}
      />

      {/* Hộp thoại chỉnh sửa */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa địa chỉ</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin địa chỉ của bạn.
            </DialogDescription>
          </DialogHeader>
          {addressToEdit && (
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='edit-address-type'>Loại địa chỉ</Label>
                  <Select
                    defaultValue={addresses
                      .find((a) => a.id === addressToEdit)
                      ?.type.toLowerCase()}
                  >
                    <SelectTrigger id='edit-address-type'>
                      <SelectValue placeholder='Chọn loại' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='home'>Nhà riêng</SelectItem>
                      <SelectItem value='work'>Công ty</SelectItem>
                      <SelectItem value='other'>Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='edit-full-name'>Họ và tên</Label>
                  <Input
                    id='edit-full-name'
                    defaultValue={
                      addresses.find((a) => a.id === addressToEdit)?.name
                    }
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-street-address'>Địa chỉ đường</Label>
                <Input
                  id='edit-street-address'
                  defaultValue={
                    addresses.find((a) => a.id === addressToEdit)?.street
                  }
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-apt'>Căn hộ, tầng (không bắt buộc)</Label>
                <Input
                  id='edit-apt'
                  defaultValue={
                    addresses.find((a) => a.id === addressToEdit)?.apt
                  }
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='edit-city'>Thành phố</Label>
                  <Input
                    id='edit-city'
                    defaultValue={
                      addresses.find((a) => a.id === addressToEdit)?.city
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='edit-state'>Tỉnh/Bang</Label>
                  <Input
                    id='edit-state'
                    defaultValue={
                      addresses.find((a) => a.id === addressToEdit)?.state
                    }
                  />
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='edit-zip'>Mã bưu điện</Label>
                  <Input
                    id='edit-zip'
                    defaultValue={
                      addresses.find((a) => a.id === addressToEdit)?.zip
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='edit-country'>Quốc gia</Label>
                  <Select defaultValue='us'>
                    <SelectTrigger id='edit-country'>
                      <SelectValue placeholder='Chọn quốc gia' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='us'>Hoa Kỳ</SelectItem>
                      <SelectItem value='ca'>Canada</SelectItem>
                      <SelectItem value='uk'>Vương Quốc Anh</SelectItem>
                      <SelectItem value='au'>Úc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='edit-phone'>Số điện thoại</Label>
                <Input
                  id='edit-phone'
                  defaultValue={
                    addresses.find((a) => a.id === addressToEdit)?.phone
                  }
                />
              </div>
              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id='edit-default-address'
                  className='h-4 w-4 rounded border-gray-300'
                  defaultChecked={
                    addresses.find((a) => a.id === addressToEdit)?.isDefault
                  }
                />
                <Label htmlFor='edit-default-address'>
                  Đặt làm địa chỉ mặc định
                </Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setIsEditDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button>Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hộp thoại xác nhận xóa */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa địa chỉ</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa địa chỉ này không? Hành động này không
              thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className='bg-red-500 hover:bg-red-600'
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
