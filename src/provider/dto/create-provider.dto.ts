import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateProviderDto {
  @IsNotEmpty()
  name: string;

  about: string;

  @IsNotEmpty()
  location: string;

  @IsEmail()
  contact_email: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone_number: string;

  @IsNotEmpty()
  is_phone_whatsapp: boolean;
}
