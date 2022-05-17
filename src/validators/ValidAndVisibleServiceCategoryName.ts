import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ServiceCategory } from 'src/service-category/entities/service-category.entity';

@ValidatorConstraint({
  name: 'isValidAndVisibleServiceCategoryName',
  async: true,
})
export default class ValidAndVisibleServiceCategoryName
  implements ValidatorConstraintInterface
{
  async validate(serviceCategoryId: string): Promise<boolean> {
    const serviceCategory = await ServiceCategory.findOne(serviceCategoryId, {
      relations: ['group'],
    }).catch(() => null);

    if (
      !serviceCategory ||
      !serviceCategory.isVisible ||
      /* 
        Obs.: Por definição, se o grupo ao qual a categoria
        pertence for invisível, a categoria também será, 
        ainda que sua propriedade isVisible seja true.
      */
      !serviceCategory.group.isVisible
    )
      return false;
    return true;
  }

  defaultMessage() {
    return `Invalid or invisible category`;
  }
}
