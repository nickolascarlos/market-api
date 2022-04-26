import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(payload: CreateServiceDto, userId: string) {
    // Verifica se o provider especificado 
    // pertence ao usuário logado
    await this.providerService.findOneFromUser(payload.providerId, userId);

    let service: Service = new Service();
    Object.assign(service, payload);
    try {
      return await service.save();
    } catch (e) {
      console.log('Nobody knows the way it\'s going to be');
      console.log(e);
    }
  }

  async findAll(offset: number, limit: number) {
    // Todo: Implementar paginação
    const services: Service[] = await Service.find({
      skip: offset,
      take: limit
    });

    return services;
  }

  async findOne(id: string) {
    const service: Service = await Service.findOneOrFail(id, {
      relations: ['category']
    }).catch(e => {
      throw new NotFoundException('No service with such id')
    })

    // Omite service.catergoryId, já que
    // a relação category foi carregada e,
    // então, o categoryId estará nela
    delete service.categoryId;

    // Transforma o JSON armazenado no banco de
    // dados, em forma de string, em um objeto.
    service.details = service.details
  
    return service;
  }

  async update(id: string, payload: UpdateServiceDto, userId: string) {
    const service: Service = await this.findOneFromUser(id, userId);

    // Omite a chave category para evitar problemas
    // com a atualização, já que a categoria só é
    // definida a partir de seu id e, então, deixar
    // o sub-objeto category poderia trazer problemas
    // na atualização da entidade
    delete service.category;

    Object.assign(service, payload);

    try {
      return await service.save();
    } catch (e) {
      console.log('Nobody knows the way it\'s going to be');
      console.log(e);
    }
  }

  async remove(id: string, userId: string) {
    const service: Service = await this.findOneFromUser(id, userId);

    // Se o serviço não pertencer ao usuário logado,
    // uma exceção será lançada

    await service.remove();

    return 'removed';
  }

  async findOneFromUser(id: string, userId: string) {
    const service: Service = await this.findOne(id);

    // Certifica-se, através do provider, de que o service
    // pertence ao usuário logado. Se não for, uma exceção
    // é lançada
    await this.providerService.findOneFromUser(service.providerId, userId).catch(e => {
      throw new ForbiddenException('This service does not belong to the logged-in user')
    });

    return service;
  }

  async search(payload: searchDto) {
  
    let query = Service.getRepository().createQueryBuilder("service")

    if (payload.categoryName)
      query.andWhere(`"categoryId" = :categoryId`, {categoryId: payload.categoryName})

    if (payload.destination)
      query.andWhere(`plainto_tsquery('portuguese', :destination) @@ to_tsvector('portuguese', COALESCE(service.details->>'destination', service.details->'itinerary'->>'destination'))`, {destination: payload.destination})
    
    if (payload.origin)
      query.andWhere(`plainto_tsquery('portuguese', :origin) @@ to_tsvector('portuguese', COALESCE(service.details->>'origin', service.details->'itinerary'->>'origin'))`, {origin: payload.origin})

    if (payload.date)
      query.andWhere(`(to_timestamp((details->>'tripStartDateTime')::integer) at time zone :timezone)::date = :startDate`, {timezone: payload.timezone, startDate: payload.date})
    
    let results = await query.getMany()
    
    return results;
  }

}
