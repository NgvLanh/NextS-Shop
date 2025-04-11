import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignInDto {
  @IsEmail({}, { message: 'Địa chỉ email không chính xác' })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @Length(6, 255, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password: string;
}
