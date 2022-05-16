import { Injectable } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly mailService: MailService) {}

  async send(payload: ContactDto) {
    await this.mailService.sendContactUsMessage(
      payload.name,
      payload.email,
      payload.topic,
      payload.message,
    );
  }
}
