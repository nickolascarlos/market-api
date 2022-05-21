import { PickType } from '@nestjs/mapped-types';
import { CreateServiceDetailsDto } from '../service-details.dto';

export class FreightDetails extends PickType(CreateServiceDetailsDto, [
  'origin',
  'operationAreas',
  'vehicleType',
  'cargoTypes',
  'maximumWeight',
  'hasAssistant',
  'hasPackaging',
  'hasFurnitureAssembly',
]) {}
