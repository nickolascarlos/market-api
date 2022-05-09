import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { __ } from 'src/translatorInstance';

@ValidatorConstraint({ name: 'isUndefined', async: true })
export default class IsUndefined implements ValidatorConstraintInterface {
  async validate(field: any, args: ValidationArguments): Promise<boolean> {
    return field === undefined;
  }

  defaultMessage(args: ValidationArguments) {
    return __(`This field should not exist`);
  }
}
