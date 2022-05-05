import { IsNotEmpty, IsOptional, IsString, Validate } from 'class-validator';
import ApiNameNotInUse_ServiceGroup from 'src/validators/ApiNameNotInUse_ServiceGroupvalidator';

export class CreateServiceGroupDto {
  @IsNotEmpty()
  displayName: string;

  @IsNotEmpty()
  icon: string;

  @IsNotEmpty()
  @Validate(ApiNameNotInUse_ServiceGroup)
  apiName: string;

  @IsOptional()
  @IsString()
  description: string;
}
