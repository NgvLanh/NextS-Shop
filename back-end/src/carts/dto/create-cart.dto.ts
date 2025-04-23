import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateCartDto {
  @IsInt({ message: 'Mã sản phẩm phải là số nguyên' })
  @IsNotEmpty({ message: 'Mã sản phẩm không được để trống' })
  productId: number;

  @IsInt({ message: 'Số lượng phải là số nguyên' })
  @Min(1, { message: 'Số lượng phải lớn hơn hoặc bằng 1' })
  quantity: number;
}
