import { Controller, Post, Body, UsePipes, HttpCode } from '@nestjs/common';
import { customValidationPipe } from 'src/utilities';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';

@Controller('contact-us')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UsePipes(customValidationPipe)
  @HttpCode(200)
  send(@Body() payload: ContactDto) {
    this.contactService.send(payload);
  }
}
