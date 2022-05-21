import { PickType } from '@nestjs/mapped-types';
import { CreateServiceDetailsDto } from '../service-details.dto';

export class RentalDetails extends PickType(CreateServiceDetailsDto, []) {}
