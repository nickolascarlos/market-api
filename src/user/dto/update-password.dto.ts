import { IsNotEmpty } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsNotEmpty()
  newPassword: string;

  @IsNotEmpty()
  token: string;
}
