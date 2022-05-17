import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ServiceGroup } from 'src/service-group/entities/service-group.entity';

@ValidatorConstraint({
  name: 'isValidAndVisibleServiceCategoryName',
  async: true,
})
export default class ValidAndVisibleServiceGroupName
  implements ValidatorConstraintInterface
{
  async validate(serviceCategoryId: string): Promise<boolean> {
    const serviceGroup = await ServiceGroup.findOne(serviceCategoryId).catch(
      () => null,
    );

    if (!serviceGroup || !serviceGroup.isVisible) return false;

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid or invisible group`;
  }
}
