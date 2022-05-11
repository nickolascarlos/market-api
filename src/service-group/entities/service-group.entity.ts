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

  @OneToMany(
    () => ServiceCategory,
    (serviceCategory) => serviceCategory.group,
    {
      cascade: ['remove', 'update'],
    },
  )
  categories: ServiceCategory[];

  @Column({ default: '' })
  description: string;

  @Column({ default: -1 })
  order: number;

  @Column({ default: true })
  isVisible: boolean;
}
