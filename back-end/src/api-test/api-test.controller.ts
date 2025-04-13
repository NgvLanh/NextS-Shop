import { Controller, Post } from '@nestjs/common';
import { MailService } from '../mail/mail.service';

@Controller('api-test')
export class ApiTestController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-email')
  async sendEmail() {
    const user: any = {
      id: 1,
      email: 'lanhnvpc06581@fpt.edu.vn',
      fullName: 'Doe',
    };
    this.mailService.sendUserConfirmation(user, 'test-token');
    return { message: 'Email is being sent (non-blocking)' };
  }
}
