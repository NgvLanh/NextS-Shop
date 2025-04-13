import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/users.service';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `${process.env.SERVER_URL}/api/auth/confirm-email?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Xác nhận Email',
      template: 'confirmation',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
