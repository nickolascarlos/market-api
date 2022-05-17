import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ServiceCategory } from 'src/service-category/entities/service-category.entity';

@ValidatorConstraint({ name: 'isApiNameNotInUse', async: true })
export default class ApiNameNotInUse_ServiceCategory
  implements ValidatorConstraintInterface
{
  async validate(apiName: string, args: ValidationArguments): Promise<boolean> {
    const apiNameIsRegistered = !!(await ServiceCategory.findOne({
      apiName,
    }));
    return !apiNameIsRegistered;
  }

  defaultMessage(args: ValidationArguments) {
    return `Such apiName is already in use`;
  }
}
