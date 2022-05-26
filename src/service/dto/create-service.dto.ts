import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Amenity } from 'src/types';
import ValidAndVisibleServiceCategoryName from 'src/validators/ValidAndVisibleServiceCategoryName';
import { CreatePartialServiceDetailsDto } from './service-details.dto';

export class CreateServiceDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  providerId: string;

  @IsNotEmpty()
  @Validate(ValidAndVisibleServiceCategoryName)
  categoryName: string;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  @IsNotEmpty()
  description: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @Min(1)
  @Max(100000)
  @IsOptional()
  price: number;

  @IsNotEmpty()
  @IsEnum(Amenity, { each: true })
  amenities: Amenity[];

  @IsBoolean()
  @IsNotEmpty()
  acceptsCards: boolean;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreatePartialServiceDetailsDto)
  details: CreatePartialServiceDetailsDto;
}
