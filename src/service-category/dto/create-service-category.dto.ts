import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  Validate,
} from 'class-validator';
import { SearchField } from 'src/types';
import ApiNameNotInUse_ServiceCategory from 'src/validators/ApiNameNotInUse_ServiceCategory.validator';
import ValidServiceGroupName from 'src/validators/ValidServiceGroupName.validator';

export class CreateServiceCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  displayName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  icon: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Validate(ApiNameNotInUse_ServiceCategory)
  apiName: string;

  @ArrayNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  @MaxLength(30, { each: true })
  alternativeNames: string[];

  @IsNotEmpty()
  @IsString()
  @Validate(ValidServiceGroupName)
  groupName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  description: string;

  @IsNotEmpty()
  @IsString({ each: true })
  @IsEnum(SearchField, { each: true })
  searchFields: string[];

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  displayOrder: number;

  @IsNotEmpty()
  @IsBoolean()
  isVisible: boolean;
}
