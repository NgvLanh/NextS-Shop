import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(200)
  async signIn(@Body() dto: SignInDto) {
    return await this.authService.signIn(dto);
  }

  @Post('sign-up')
  @HttpCode(200)
  async signUp(@Body() dto: SignUpDto) {
    return await this.authService.signUp(dto);
  }

  @Get('confirm-email')
  @HttpCode(200)
  async confirmEmail(@Query('token') token: string, @Res() res: Response) {
    const result = await this.authService.confirmEmail(token);
    if (result.success) {
      return res.redirect(`${process.env.CLIENT_URL}/login`);
    }
  }

  @UseGuards(AuthGuard)
  @Get('verify-token')
  @HttpCode(200)
  async verifyToken(@Req() req: Request, @Res() res: Response) {
    const result = await this.authService.verifyToken(req);
    if (!result.success) {
      return res.redirect(`${process.env.CLIENT_URL}/login`);
    }
    return res.json(result);
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  @HttpCode(200)
  async updateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    return await this.authService.updateProfile(updateUserDto, req);
  }

  @UseGuards(AuthGuard)
  @Put('change-password')
  @HttpCode(200)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: Request,
  ) {
    return await this.authService.changePassword(changePasswordDto, req);
  }

  @UseGuards(AuthGuard)
  @Put('avatar')
  @HttpCode(200)
  async updateAvatar(@Body() data: { avatarUrl: string }, @Req() req: Request) {
    return await this.authService.updateAvatar(data.avatarUrl, req);
  }
}
