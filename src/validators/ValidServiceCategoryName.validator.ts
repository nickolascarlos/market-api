import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { ServiceCategory } from 'src/service-category/entities/service-category.entity';

@ValidatorConstraint({ name: 'isValidServiceCategoryName', async: true })
export default class ValidServiceCategoryName
  implements ValidatorConstraintInterface
{
  async validate(
    serviceCategoryId: string,
    args: ValidationArguments,
  ): Promise<boolean> {
    const serviceCategory = await ServiceCategory.findOne(
      serviceCategoryId,
    ).catch(() => null);
    return Boolean(serviceCategory);
  }

  defaultMessage(args: ValidationArguments) {
    return `No such service category with id ${args.object['categoryName']}`;
  }
}
