import { IsNotEmpty } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  fullName: string;

  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  phone: string;

  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  address: any;
}
