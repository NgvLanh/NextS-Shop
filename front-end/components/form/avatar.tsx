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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User } from 'lucide-react';
import { useRef, useState } from 'react';
import { UserType } from '../../lib/types';
import { imageToBase64 } from '../../lib/utils';
import { ApiRequest, ApiResponse } from '../../services/apiRequest';

export default function AvatarForm({ data }: { data: UserType | null }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const base64 = await imageToBase64(file);
      try {
        const result = await ApiRequest<ApiResponse>(
          `auth/avatar/${data?.id}`,
          'PUT',
          {
            avatar: base64,
          }
        );
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteAvatar = () => {
    console.log('Đã xoá ảnh');
    setOpen(false);
  };

  return (
    <div className='relative w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4 overflow-hidden select-none'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {data?.avatarUrl ? (
            <img src={data?.avatarUrl} alt='Avatar' />
          ) : (
            <User className='h-10 w-10 text-primary' />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Cập nhật</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleUploadClick}>
            Tải ảnh lên
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Xoá ảnh
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận?</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn chắc chắn muốn xoá hình ảnh?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Huỷ
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAvatar}>
              Tiếp tục
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
