import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
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
  async verifyToken() {
    return await this.authService.verifyToken();
  }
}
