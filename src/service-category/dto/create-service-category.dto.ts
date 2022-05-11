import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { SearchField } from 'src/types';
import ApiNameNotInUse_ServiceCategory from 'src/validators/ApiNameNotInUse_ServiceCategory.validator';
import ValidServiceGroupName from 'src/validators/ValidServiceGroupName.validator';

export class CreateServiceCategoryDto {
  @IsNotEmpty()
  displayName: string;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @Validate(ApiNameNotInUse_ServiceCategory)
  apiName: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  alternativeNames: string[];

  @IsNotEmpty()
  @Validate(ValidServiceGroupName)
  groupName: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString({ each: true })
  @IsEnum(SearchField, { each: true })
  searchFields: string[];

  @IsOptional()
  @IsNumber()
  order: number;

  @IsOptional()
  @IsBoolean()
  isVisible: boolean;
}
