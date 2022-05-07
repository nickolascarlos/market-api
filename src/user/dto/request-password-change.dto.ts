import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RequestPasswordChangeDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}
