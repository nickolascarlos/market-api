import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProviderDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  about: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsEmail()
  contactEmail: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phoneNumber: string;

  @IsNotEmpty()
  @IsBoolean()
  isPhoneWhatsApp: boolean;
}
