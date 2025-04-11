import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class SignUpDto {
  @IsEmail({}, { message: 'Địa chỉ email không chính xác' })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @Length(6, 255, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;

  @IsNotEmpty({ message: 'Tên không được để trống' })
  @Length(2, 255, { message: 'Tên phải có ít nhất 2 ký tự' })
  fullName: string;

  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @IsPhoneNumber('VN', { message: 'Số điện thoại không hợp lệ' })
  phone: string;
}
