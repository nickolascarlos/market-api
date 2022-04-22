import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
import { ServiceCategory } from 'src/service-category/entities/service-category.entity';
  
@ValidatorConstraint({ name: 'ValidServiceCategoryId', async: true })
export default class ValidServiceCategoryId implements ValidatorConstraintInterface {
    async validate(serviceCategoryId: string, args: ValidationArguments): Promise<boolean> {
        let serviceCategory = await ServiceCategory.findOne(serviceCategoryId).catch(() => null)
        return Boolean(serviceCategory)
    }
  
    defaultMessage(args: ValidationArguments) {
      return `No such service category with id ${args.object['categoryId']}`;
    }
  }
  