import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { __ } from 'src/translatorInstance';
import { User } from '../user/entities/user.entity';

@ValidatorConstraint({ name: 'isEmailNotInUse', async: true })
export default class EmailNotInUse implements ValidatorConstraintInterface {
  async validate(email: string, args: ValidationArguments): Promise<boolean> {
    const emailIsRegistered = !!(await User.findOne({
      email,
    }));
    return !emailIsRegistered;
  }

  defaultMessage(args: ValidationArguments) {
    return __(`Email is already in use`);
  }
}
