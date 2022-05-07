import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPasswordResetToken(token: string, email: string, name: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Redefinição de Senha | Moblit',
      html: `<p>Olá, ${name}</p>
        <p>Abaixo está seu token para redefinição de senha:</p>
        <p><strong>${token}</strong></p>
        <p>Se não foi você quem solicitou, basta ignorar este email :)</p>`,
    });
  }
}
