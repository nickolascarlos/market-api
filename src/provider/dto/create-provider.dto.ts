import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateProviderDto {
  @IsNotEmpty()
  name: string;

  about: string;

  @IsNotEmpty()
  location: string;

  @IsEmail()
  contactEmail: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phoneNumber: string;

  @IsNotEmpty()
  isPhoneWhatsapp: boolean;
}
