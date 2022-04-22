import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
  } from 'class-validator';
import { ServiceCategoryService } from 'src/service-category/service-category.service';
  
@ValidatorConstraint({ name: 'ValidServiceCategory', async: true })
export default class ValidServiceCategory implements ValidatorConstraintInterface {
    async validate(serviceCategoryId: string, args: ValidationArguments): Promise<boolean> {
        let serviceCategory = await new ServiceCategoryService().findOne(serviceCategoryId).catch(() => null)
        return Boolean(serviceCategory)
    }
  
    defaultMessage(args: ValidationArguments) {
      return `No such service category with id ${args.object['categoryId']}`;
    }
  }
  