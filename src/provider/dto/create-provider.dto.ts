import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateProviderDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(15)
  @MaxLength(200)
  about: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(70)
  location: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  contactEmail: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('BR')
  phoneNumber: string;

  @IsNotEmpty()
  @IsBoolean()
  isPhoneWhatsApp: boolean;

  @IsOptional()
  @IsString()
  @IsUUID()
  avatarFileId: string;
}
