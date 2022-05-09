import { OmitType, PartialType } from '@nestjs/mapped-types';
import { Validate, ValidatorConstraint } from 'class-validator';
import { __ } from 'src/translatorInstance';
import IsUndefined from 'src/validators/IsUndefined.validate';
import { CreateServiceDto } from './create-service.dto';

@ValidatorConstraint({ name: 'isUndefined', async: true })
export class UpdateServiceDto extends PartialType(
  OmitType(CreateServiceDto, ['providerId', 'categoryName']),
) {
  @Validate(IsUndefined, {
    message: __('The category cannot be updated'),
  })
  categoryName: string;
}
