import { HttpException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponse } from '../../configs/api-response';
import { MailService } from '../mail/mail.service';
import { User } from '../users/entities/user.entity';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userRepository.findOne({
      where: { email, isActive: true, verifyEmail: true },
      relations: { role: true },
    });

    if (!user || user.password !== password) {
      this.logger.error(`Email hoặc mật khẩu không hợp lệ: ${email}`);
      throw new HttpException(
        ApiResponse.error('Email hoặc mật khẩu không hợp lệ'),
        401,
      );
    }

    this.logger.log(`Đăng nhập thành công: ${email}`);
    const { password: _, isActive, ...userData } = user;
    const payload = { sub: user.id, email: user.email };

    return ApiResponse.success('Đăng nhập thành công', {
      accessToken: this.jwtService.sign(payload),
      user: userData,
    });
  }

  async signUp(signUpDto: SignUpDto) {
    const { email } = signUpDto;

    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      this.logger.error(`Email đã tồn tại: ${email}`);
      throw new HttpException(ApiResponse.error('Email đã tồn tại'), 400);
    }

    const newUser = this.userRepository.create(signUpDto);
    const savedUser = await this.userRepository.save(newUser);

    const { password, isActive, ...userData } = savedUser;
    const payload = { sub: newUser.id, email: newUser.email };
    const token = this.jwtService.sign(payload);

    this.mailService.sendUserConfirmation(savedUser, token);

    this.logger.log(`Đăng ký người dùng thành công: ${email}`);
    return ApiResponse.success('Đăng ký thành công', userData);
  }

  async confirmEmail(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const { email } = decoded;

      const user = await this.userRepository.findOneBy({ email });
      if (!user) {
        this.logger.error(`Không tìm thấy người dùng với email: ${email}`);
        throw new HttpException(
          ApiResponse.notFound('Không tìm thấy người dùng'),
          404,
        );
      }

      user.verifyEmail = true;
      await this.userRepository.save(user);

      this.logger.log(`Xác nhận email thành công: ${email}`);
      return ApiResponse.success(`Xác nhận email ${email} thành công!`);
    } catch (error) {
      this.logger.error('Token không hợp lệ hoặc đã hết hạn', error.stack);
      throw new HttpException(
        ApiResponse.error('Token không hợp lệ hoặc đã hết hạn'),
        400,
      );
    }
  }

  async verifyToken() {
    this.logger.log('Xác minh token người dùng thành công');
    return ApiResponse.success('Xác minh token người dùng thành công');
  }
}
