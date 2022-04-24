import { IsBoolean, IsEmail, IsNotEmpty, IsPhoneNumber, Validate } from 'class-validator';
import EmailNotInUse from 'src/validators/EmailNotInUse.validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @Validate(EmailNotInUse)
  email: string;

  @IsNotEmpty()
  password: string;

  @IsPhoneNumber('BR')
  @IsNotEmpty()
  phoneNumber: string;

  @IsBoolean()
  @IsNotEmpty()
  isPhoneWhatsapp: boolean;
}
