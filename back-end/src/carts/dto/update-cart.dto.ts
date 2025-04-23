import { IsNotEmpty } from 'class-validator';

export class UpdateCartDto {
  @IsNotEmpty({ message: 'Phương thức không được để trống' })
  method?: string;

  quantity?: number;
}
