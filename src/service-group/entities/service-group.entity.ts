import { ServiceCategory } from 'src/service-category/entities/service-category.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('ServiceGroup')
export class ServiceGroup extends BaseEntity {
  @Column()
  displayName: string;

  @PrimaryColumn()
  apiName: string;

  @Column()
  icon: string;

  @OneToMany(() => ServiceCategory, (serviceCategory) => serviceCategory.group)
  categories: ServiceCategory[];

  @Column({ default: '' })
  description: string;
}
