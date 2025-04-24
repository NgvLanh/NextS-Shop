import { HttpException } from '@nestjs/common';
import { ApiResponse } from '../configs/api-response';

export async function isVerifyUser(req: any, userRepository: any) {
  const userId = req.user?.sub;

  if (!userId) {
    throw new HttpException(
      ApiResponse.error('Truy cập không được phép!'),
      401,
    );
  }

  const user = await userRepository.findOne({
    where: { id: userId },
    relations: { addresses: true },
  });

  if (!user) {
    throw new HttpException(
      ApiResponse.notFound('Không tìm thấy người dùng!'),
      404,
    );
  }
  return user;
}
