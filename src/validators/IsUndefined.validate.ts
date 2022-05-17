import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isUndefined', async: true })
export default class IsUndefined implements ValidatorConstraintInterface {
  async validate(field: any, args: ValidationArguments): Promise<boolean> {
    return field === undefined;
  }

  defaultMessage(args: ValidationArguments) {
    return `This field should not exist`;
  }
}
