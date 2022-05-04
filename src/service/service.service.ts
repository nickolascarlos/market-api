import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProviderService } from 'src/provider/provider.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import * as _ from 'lodash';
import { result } from 'lodash';
import { Like } from 'typeorm';
import { searchDto } from './dto/search.dto';

@Injectable()
export class ServiceService {
  constructor(private readonly providerService: ProviderService) {}

  async create(payload: CreateServiceDto, userId: string, adminAction = false) {
    if (!adminAction) {
      // Verifica se o provider especificado
      // pertence ao usuário logado
      await this.providerService.findOneFromUser(payload.providerId, userId);
    }

    const service: Service = new Service();
    Object.assign(service, payload);
    await Service.insert(service);
    return service;
  }

  async findAll(offset: number, limit: number) {
    // Todo: Implementar paginação
    const services: Service[] = await Service.find({
      relations: ['category'],
      skip: offset,
      take: limit,
    });

    return services;
  }

  async findOne(id: string) {
    const service: Service = await Service.findOneOrFail(id, {
      relations: ['category'],
    }).catch((e) => {
      throw new NotFoundException('No service with such id');
    });

    // Transforma o JSON armazenado no banco de
    // dados, em forma de string, em um objeto.
    service.details = service.details;

    return service;
  }

  async update(
    id: string,
    payload: UpdateServiceDto,
    userId: string,
    adminAction = false,
  ) {
    const service: Service = !adminAction
      ? await this.findOneFromUser(id, userId)
      : await this.findOne(id);

    // Omite a chave category para evitar problemas
    // com a atualização, já que a categoria só é
    // definida a partir de seu id e, então, deixar
    // o sub-objeto category poderia trazer problemas
    // na atualização da entidade
    delete service.category;

    Object.assign(service, payload);

    return await service.save();
  }

  async remove(id: string, userId: string, adminAction = false) {
    // Se o serviço não pertencer ao usuário logado,
    // uma exceção será lançada
    const service: Service = !adminAction
      ? await this.findOneFromUser(id, userId)
      : await this.findOne(id);

    await service.remove();
    return 'removed';
  }

  async findOneFromUser(id: string, userId: string) {
    const service: Service = await this.findOne(id);

    // Certifica-se, através do provider, de que o service
    // pertence ao usuário logado. Se não for, uma exceção
    // é lançada
    await this.providerService
      .findOneFromUser(service.providerId, userId)
      .catch((e) => {
        throw new ForbiddenException(
          'This service does not belong to the logged-in user',
        );
      });

    return service;
  }

  async search(payload: searchDto) {
    const query = Service.getRepository().createQueryBuilder('service');

    if (payload.categoryName)
      query.andWhere(`"categoryId" = :categoryId`, {
        categoryId: payload.categoryName,
      });

    if (payload.destination)
      query.andWhere(
        `plainto_tsquery('portuguese', :destination) @@ to_tsvector('portuguese', COALESCE(service.details->>'destination', service.details->'itinerary'->>'destination'))`,
        { destination: payload.destination },
      );

    if (payload.origin)
      query.andWhere(
        `plainto_tsquery('portuguese', :origin) @@ to_tsvector('portuguese', COALESCE(service.details->>'origin', service.details->'itinerary'->>'origin'))`,
        { origin: payload.origin },
      );

    if (payload.date)
      query.andWhere(
        `(to_timestamp((details->>'tripStartDateTime')::integer) at time zone :timezone)::date = :startDate`,
        { timezone: payload.timezone, startDate: payload.date },
      );

    const results = await query.getMany();

    return results;
  }
}
