import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  text: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  street: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  neighborhood: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  city: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  state: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  country: string;
}
