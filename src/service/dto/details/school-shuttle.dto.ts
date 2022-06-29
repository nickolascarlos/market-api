import { PickType } from '@nestjs/mapped-types';
import { CreateServiceDetailsDto } from '../service-details.dto';

export class SchoolShuttleDetails extends PickType(CreateServiceDetailsDto, [
  'origin',
  'operationAreas',
  'vehicleSeats',
  'vehicleType',
  'goingTripStartTime',
  'returnTripStartTime',
  'workingDays',
  'hasAssistant',
]) {}
