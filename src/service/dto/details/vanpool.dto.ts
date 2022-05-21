import { PickType } from '@nestjs/mapped-types';
import { CreateServiceDetailsDto } from '../service-details.dto';

export class VanpoolDetails extends PickType(CreateServiceDetailsDto, [
  'itinerary',
  'goingTripStartTime',
  'returnTripStartTime',
  'workingDays',
  'vehicleSeats',
  'acceptsPackages',
  'isTripStartTimeFlexible',
]) {}
