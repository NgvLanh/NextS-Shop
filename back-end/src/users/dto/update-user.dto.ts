import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString({ message: 'Họ và tên phải là chuỗi ký tự' })
  fullName?: string;

  @IsString({ message: 'Số điện thoại phải là chuỗi ký tự' })
  phone?: string;

  avatarUrl: string;
}
