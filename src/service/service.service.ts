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
import { Repository } from 'typeorm';
import { SearchDto } from './dto/search.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { __ } from 'src/translatorInstance';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    private readonly providerService: ProviderService,
  ) {}

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
      throw new NotFoundException(__('No service with such id'));
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
          __('This service does not belong to the logged-in user'),
        );
      });

    return service;
  }

  async search(payload: SearchDto) {
    const query = Service.getRepository().createQueryBuilder('service');

    if (payload.categoryName)
      query.andWhere(`"categoryName" = :categoryName`, {
        categoryName: payload.categoryName,
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

  async protoSearch(query: string) {
    return await this.serviceRepository.query(
      `WITH
    initial as (SELECT id, "categoryName", description, details FROM "Service"),
    data_expanded as (SELECT id, "categoryName",
              COALESCE(details->'origin'->'address'->>'city', details->'itinerary'->'origin'->'address'->>'city') as "originCity",
              COALESCE(details->'origin'->'address'->>'text', details->'itinerary'->'origin'->'address'->>'text') as "originPlace",
              COALESCE(details->'destination'->'address'->>'city', details->'itinerary'->'destination'->'address'->>'city') as "destinationCity",
              COALESCE(details->'destination'->'address'->>'city', details->'itinerary'->'destination'->'address'->>'text') as "destinationPlace",
                      (details->>'tripStartDateTime') as "startDateTime",
                  details->'workingDays' as "workingDays"
            FROM initial),
    working_days_expanded as (SELECT id, jsonb_array_elements("workingDays") as temp_wod FROM data_expanded),
    wods_translation as (SELECT id, array_agg(CASE 
                                     WHEN temp_wod = '"SUNDAY"' 	 THEN 'domingo'
                                     WHEN temp_wod = '"MONDAY"' 	 THEN 'segunda-feira'
                                     WHEN temp_wod = '"TUESDAY"' 	 THEN 'terca-feira'
                                     WHEN temp_wod = '"WEDNESDAY"' THEN 'quarta-feira'
                                     WHEN temp_wod = '"THURSDAY"'  THEN 'quinta-feira'
                                     WHEN temp_wod = '"FRIDAY"'    THEN 'sexta-feira'
                                     WHEN temp_wod = '"SATURDAY"'  THEN 'sabado'
                                   END) as translated_wods
                       from working_days_expanded GROUP BY id),
    translated_wods as (SELECT data_expanded.id, "categoryName", "startDateTime", "originCity", "originPlace", "destinationCity", "destinationPlace", translated_wods as "workingDays" FROM data_expanded FULL JOIN wods_translation ON data_expanded.id = wods_translation.id),
    category_expanded as (SELECT translated_wods.*, "ServiceCategory"."alternativeNames" as "alternativeCategoryNames" FROM translated_wods FULL JOIN "ServiceCategory" ON translated_wods."categoryName" = "ServiceCategory"."apiName"),
    ranking_parameters as (SELECT 
      (CASE WHEN (to_tsquery('portuguese', $1) @@ to_tsvector('portuguese', "originCity")) = true THEN 1 ELSE 0 END) as "rOriginCity",
      (CASE WHEN (to_tsquery('portuguese', $1) @@ to_tsvector('portuguese', "destinationCity")) = true THEN 1 ELSE 0 END) as "rDestinationCity",
      (CASE WHEN (to_tsquery('portuguese', $1) @@ to_tsvector('portuguese', "categoryName") 
              OR (to_tsquery('portuguese', $1) @@ to_tsvector('portuguese', "alternativeCategoryNames"::text))) = true THEN 1 ELSE 0 END) as "rCategoryName",
      (CASE WHEN (to_tsquery('portuguese', $1) @@ to_tsvector('portuguese', "workingDays"::text)) = true THEN 1 ELSE 0 END) as "rWorkingDays", *
    FROM category_expanded)
  SELECT ("rOriginCity" * 4 + "rDestinationCity" * 2 + "rCategoryName" * 3 + "rWorkingDays" * 3.5) as note, * FROM ranking_parameters WHERE ("rOriginCity" * 4 + "rDestinationCity" * 2 + "rCategoryName" * 3 + "rWorkingDays" * 3.5) > 0 ORDER BY note DESC`,
      [_.deburr(query).split(' ').join(' | ')],
    );
  }
}
