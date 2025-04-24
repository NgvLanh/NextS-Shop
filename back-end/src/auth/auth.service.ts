import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { ApiResponse } from '../../configs/api-response';
import { isVerifyUser } from '../../libs/auth-verifit';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { MailService } from '../mail/mail.service';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { User } from '../users/entities/user.entity';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly cloundinaryService: CloudinaryService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userRepository.findOne({
      where: { email, isActive: true },
      relations: { role: true },
    });

    if (user && !user.verifyEmail) {
      throw new HttpException(
        ApiResponse.error('Tài khoản chưa xác nhận email!'),
        401,
      );
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new HttpException(
        ApiResponse.error('Email hoặc mật khẩu không hợp lệ!'),
        401,
      );
    }

    const { password: _, isActive, ...userData } = user;
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return ApiResponse.success('Đăng nhập thành công!', {
      accessToken: token,
      user: userData,
    });
  }

  async signUp(signUpDto: SignUpDto) {
    const { email } = signUpDto;

    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new HttpException(ApiResponse.error('Email đã tồn tại'), 400);
    }

    signUpDto.password = await bcrypt.hash(signUpDto.password, 10);
    const newUser = this.userRepository.create(signUpDto);
    const savedUser = await this.userRepository.save(newUser);

    const { password, isActive, ...userData } = savedUser;
    const payload = { sub: newUser.id, email: newUser.email };
    const token = this.jwtService.sign(payload);

    this.mailService.sendUserConfirmation(savedUser, token);

    return ApiResponse.success('Đăng ký thành công', userData);
  }

  async confirmEmail(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const { email } = decoded;

      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        throw new HttpException(
          ApiResponse.notFound('Không tìm thấy người dùng'),
          404,
        );
      }

      user.verifyEmail = true;
      await this.userRepository.save(user);

      return ApiResponse.success(`Xác nhận email ${email} thành công!`);
    } catch (error) {
      throw new HttpException(
        ApiResponse.error('Token không hợp lệ hoặc đã hết hạn'),
        400,
      );
    }
  }

  async verifyToken(req) {
    const user = await isVerifyUser(req, this.userRepository);
    const { password, verifyEmail, isActive, ...result } = user;
    return ApiResponse.success('Xác minh token người dùng thành công', result);
  }

  async updateProfile(updateUserDto: UpdateUserDto, req) {
    const user = await isVerifyUser(req, this.userRepository);

    Object.assign(user, {
      ...updateUserDto,
      updatedAt: new Date(),
    });

    try {
      const updatedUser = await this.userRepository.save(user);
      return ApiResponse.success('Cập nhật hồ sơ thành công!', updatedUser);
    } catch (error) {
      throw new HttpException(
        ApiResponse.error('Đã xảy ra lỗi khi cập nhật hồ sơ!'),
        500,
      );
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto, req) {
    const user = await isVerifyUser(req, this.userRepository);

    const isCurrentPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new HttpException(
        ApiResponse.error('Mật khẩu hiện tại không chính xác!'),
        400,
      );
    }

    if (changePasswordDto.currentPassword === changePasswordDto.newPassword) {
      throw new HttpException(
        ApiResponse.error('Mật khẩu mới phải khác mật khẩu cũ!'),
        400,
      );
    }

    try {
      user.password = await bcrypt.hash(changePasswordDto.newPassword, 10);
      const updatedUser = await this.userRepository.save(user);

      const { password, isActive, verifyEmail, ...result } = updatedUser;
      return ApiResponse.success('Cập nhật mật khẩu thành công!', result);
    } catch (error) {
      throw new HttpException(
        ApiResponse.error('Đã xảy ra lỗi khi cập nhật mật khẩu!'),
        500,
      );
    }
  }

  async updateAvatar(avatarUrl: string, req) {
    const user = await isVerifyUser(req, this.userRepository);

    try {
      user.avatarUrl = avatarUrl
        ? await this.cloundinaryService.uploadBase64(avatarUrl)
        : '';

      const updatedUser = await this.userRepository.save(user);
      const { password, isActive, verifyEmail, ...result } = updatedUser;

      return ApiResponse.success('Cập nhật hình ảnh thành công!', result);
    } catch (error) {
      throw new HttpException(
        ApiResponse.error('Đã xảy ra lỗi khi cập nhật hình ảnh!'),
        500,
      );
    }
  }
}
