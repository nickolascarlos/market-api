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

  async sendContactUsMessage(
    name: string,
    email: string,
    topic: string,
    message: string,
  ) {
    this.mailerService.sendMail({
      to: 'moblitapp@gmail.com',
      subject: `Contate-nos | ${topic}`,
      replyTo: email,
      html: `
      <style>
      body {
        font-family: helvetica;
      }
      
      .message {
        margin-left: 20px;
      }
      </style>
      <div>
      <p>
          <strong>Nome:</strong>
          <span class='field'>${name}</span></p>
      <p>
          <strong>Email:</strong>
          <span class='field'>${email}</span>
      </p>
      <p>
          <strong>Tópico:</strong>
          <span class='field'>${topic}</span>
      </p>
      <p>
        <strong>Mensagem:</strong><br/>
        <p class='message'>
          ${message}
        </p>
      </p>
      
      </div>
      `,
    });
  }
}
