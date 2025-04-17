import { IsNotEmpty, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'Mật khẩu cũ không được để trống' })
  @Length(6, 255, { message: 'Mật khẩu cũ phải có ít nhất 6 ký tự' })
  currentPassword: string;

  @IsNotEmpty({ message: 'Mật khẩu mới không được để trống' })
  @Length(6, 255, { message: 'Mật khẩu mới phải có ít nhất 6 ký tự' })
  newPassword: string;

  @IsNotEmpty({ message: 'Mật khẩu xác nhận không được để trống' })
  @Length(6, 255, { message: 'Mật khẩu xác nhận phải có ít nhất 6 ký tự' })
  confirmPassword: string;
}
