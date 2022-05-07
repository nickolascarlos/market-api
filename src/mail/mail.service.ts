import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly config: ConfigService,
  ) {}

  async sendPasswordResetToken(token: string, email: string, name: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Redefinição de Senha | Moblit',
      html: `<p>Olá, ${name}</p>
        <p></p>
        <p>Para redefinir sua senha, clique neste link (ou copie-o e cole-o no navegador):</p>
        <p>
          <a href='${this.config.get('RESET_PASSWORD_URL')}?token=${token}'>
            ${this.config.get('RESET_PASSWORD_URL')}?token=${token}
          </a>
          </p>
        <p></p>
        <p>Se não foi você quem solicitou, basta ignorar este email :)</p>`,
    });
  }
}
