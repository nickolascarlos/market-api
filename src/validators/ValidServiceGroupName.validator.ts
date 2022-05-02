import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ServiceGroup } from 'src/service-group/entities/service-group.entity';

@ValidatorConstraint({ name: 'isValidServiceGroupName', async: true })
export default class ValidServiceGroupName
  implements ValidatorConstraintInterface
{
  async validate(apiName: string, args: ValidationArguments): Promise<boolean> {
    const apiNameIsRegistered = !!(await ServiceGroup.findOne({
      apiName,
    }));
    return apiNameIsRegistered;
  }

  defaultMessage(args: ValidationArguments) {
    return `No such service group with such name ${args.object['groupName']}`;
  }
}
