import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { CreateServiceDto } from 'src/service/dto/create-service.dto';
import details from 'src/service/dto/details';
import { customPipeOptions } from 'src/utilities';

export class ServiceDetailsPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    // Verifica se é uma instância de CreateServiceDto
    value = plainToInstance(CreateServiceDto, value);
    await validateOrReject(value, customPipeOptions).catch((e) => {
      throw customPipeOptions.exceptionFactory(e);
    });

    // Valida o details de acordo com o categoryName
    const detailsValidatorClass = details[value.categoryName];
    value.details = plainToInstance(detailsValidatorClass, value.details);
    await validateOrReject(value.details).catch((e) => {
      throw customPipeOptions.exceptionFactory([
        {
          property: 'details',
          children: e.map((x) => {
            // Exclui a propriedade target
            const { target, ...u } = x;
            return u;
          }),
        },
      ]);
    });

    return value;
  }
}
