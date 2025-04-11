import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from '../../configs/api-response';
import { User } from '../users/entities/user.entity';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOneBy({
      email: signInDto.email,
    });

    if (!user || user.password !== signInDto.password) {
      Logger.error(`Email hoặc mật khẩu không chính xác: ${signInDto.email}`);
      throw new HttpException(
        ApiResponse.error('Email hoặc mật khẩu không chính xác'),
        401,
      );
    }
    Logger.log(`Đăng nhập thành công: ${signInDto.email}`);
    const { id, email, fullName, phone } = user;
    const userResponse = { id, email, name: fullName, phone };
    return ApiResponse.success(userResponse, 'Đăng nhập thành công');
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.userRepository.findOneBy({
      email: signUpDto.email,
    });
    if (user) {
      Logger.error(`Email đã tồn tại: ${signUpDto.email}`);
      throw new HttpException(ApiResponse.error('Email đã tồn tại'), 400);
    }
    const newUser = this.userRepository.create(signUpDto);
    const savedUser = await this.userRepository.save(newUser);
    const { id, email, fullName, phone } = savedUser;
    const userResponse = { id, email, name: fullName, phone };
    return ApiResponse.success(userResponse, 'Đăng ký thành công');
  }
}
