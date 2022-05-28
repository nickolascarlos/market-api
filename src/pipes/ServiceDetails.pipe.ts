import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { CreateServiceDto } from 'src/service/dto/create-service.dto';
import details from 'src/service/dto/details';
import { customPipeOptions } from 'src/utilities';
import * as _ from 'lodash';
import { flattenValidationErrors } from 'class-validator-errors-flattener';

export class ServiceDetailsPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    let errorMessage = {};
    // Verifica se é uma instância de CreateServiceDto
    await validateOrReject(
      plainToInstance(CreateServiceDto, value),
      customPipeOptions,
    ).catch((e) => {
      errorMessage = _.merge(
        errorMessage,
        _.keyBy(flattenValidationErrors(e), 'property'),
      );
    });

    // Valida o details de acordo com o categoryName,
    // se os campos categoryNames e details não possuírem erros
    if (
      !Object.keys(errorMessage).includes('categoryName') &&
      !Object.keys(errorMessage).includes('details')
    ) {
      const detailsValidatorClass = details[value.categoryName];
      await validateOrReject(
        plainToInstance(detailsValidatorClass, value.details),
        customPipeOptions,
      ).catch((e) => {
        errorMessage = _.merge(
          errorMessage,
          _.keyBy(
            flattenValidationErrors([
              {
                property: 'details',
                children: e.map((x) => {
                  // Exclui a propriedade target
                  const { target, ...u } = x;
                  return u;
                }),
              },
            ]),
            'property',
          ),
        );
      });
    }

    if (Object.keys(errorMessage).length > 0)
      throw customPipeOptions.exceptionFactory(
        Object.entries(errorMessage).map(([errorKey, errorProperty]) => {
          return errorProperty;
        }) as ValidationError[],
      );

    return value;
  }
}
