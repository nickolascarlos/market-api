import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import ApiNameNotInUse_ServiceCategory from 'src/validators/ApiNameNotInUse_ServiceCategory.validator';
import ValidServiceGroupName from 'src/validators/ValidServiceGroupName.validator';

export class CreateServiceCategoryDto {
  @IsNotEmpty()
  displayName: string;

  @IsNotEmpty()
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
}
