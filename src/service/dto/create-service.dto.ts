import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Amenity } from 'src/types';
import ValidAndVisibleServiceCategoryName from 'src/validators/ValidAndVisibleServiceCategoryName';
import { CreatePartialServiceDetailsDto } from './service-details.dto';

export class CreateServiceDto {
  @IsUUID()
  @IsNotEmpty()
  providerId: string;

  @IsNotEmpty()
  @Validate(ValidAndVisibleServiceCategoryName)
  categoryName: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsOptional()
  price: number;

  @IsNotEmpty()
  @IsEnum(Amenity, { each: true })
  amenities: Amenity[];

  @IsOptional()
  @IsBoolean()
  acceptsCards: boolean;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreatePartialServiceDetailsDto)
  details: CreatePartialServiceDetailsDto;
}
