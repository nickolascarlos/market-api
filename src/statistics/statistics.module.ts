import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Provider } from 'src/provider/entities/provider.entity';
import { Service } from 'src/service/entities/service.entity';
import { ServiceGroup } from 'src/service-group/entities/service-group.entity';
import { ServiceCategory } from 'src/service-category/entities/service-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Provider,
      Service,
      ServiceGroup,
      ServiceCategory,
    ]),
  ],
  providers: [StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}
