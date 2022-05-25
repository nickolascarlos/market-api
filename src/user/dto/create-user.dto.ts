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
  Validate,
} from 'class-validator';
import EmailNotInUse from 'src/validators/EmailNotInUse.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(35)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(70)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Validate(EmailNotInUse)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
  password: string;

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
