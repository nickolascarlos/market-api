import { IsEmail, IsPhoneNumber, IsNotEmpty, Validate } from 'class-validator';
import EmailNotInUse from 'src/validators/EmailNotInUse.validator';

export class CreateUserDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  @Validate(EmailNotInUse)
  email: string;

  @IsNotEmpty()
  password: string;

  @IsPhoneNumber('BR')
  @IsNotEmpty()
  phone_number: string;
}
