import { ServiceGroup } from '../../service-group/entities/service-group.entity';
import { Service } from '../../service/entities/service.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity('ServiceCategory')
export class ServiceCategory extends BaseEntity {
  @ManyToOne(() => ServiceGroup, (serviceGroup) => serviceGroup.categories, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'groupName' })
  group: ServiceGroup;

  @Column()
  groupName: string;

  @Column()
  displayName: string;

  @Column()
  icon: string;

  @PrimaryColumn()
  apiName: string;

  @OneToMany(() => Service, (service) => service.category, {
    cascade: ['remove', 'update'],
  })
  services: Service[];

  @Column('text', {
    array: true,
  })
  alternativeNames: string[];

  @Column({ default: '' })
  description: string;

  @Column('text', { array: true, default: [] })
  searchFields: string[];

  @Column({ default: -1 })
  displayOrder: number;

  @Column({ default: true })
  isVisible: boolean;
}
