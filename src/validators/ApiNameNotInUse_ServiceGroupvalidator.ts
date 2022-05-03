import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ServiceGroup } from 'src/service-group/entities/service-group.entity';

@ValidatorConstraint({ name: 'isApiNameNotInUse', async: true })
export default class ApiNameNotInUse_ServiceGroup
  implements ValidatorConstraintInterface
{
  async validate(apiName: string, args: ValidationArguments): Promise<boolean> {
    const apiNameIsRegistered = !!(await ServiceGroup.findOne({
      apiName,
    }));
    return !apiNameIsRegistered;
  }

  defaultMessage(args: ValidationArguments) {
    return `Such apiName is already in use`;
  }
}
