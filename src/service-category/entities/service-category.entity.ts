import { ServiceGroup } from 'src/service-group/entities/service-group.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity('ServiceCategory')
export class ServiceCategory extends BaseEntity {
  @ManyToOne(() => ServiceGroup, (serviceGroup) => serviceGroup.categories, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'groupName' })
  group: ServiceGroup;

  @Column({ nullable: false, default: 'no-group' })
  groupName: string;

  @Column()
  displayName: string;

  @Column()
  icon: string;

  @PrimaryColumn()
  apiName: string;

  @Column('text', {
    array: true,
  })
  alternativeNames: string[];
}
