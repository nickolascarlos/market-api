import { Service } from 'src/service/entities/service.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity('Provider')
export class Provider extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.providers, {
    onDelete: 'CASCADE',
  })
  user: User;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column({ default: '' })
  about: string;

  @Column()
  location: string;

  @Column()
  contactEmail: string;

  @Column()
  phoneNumber: string;

  @Column()
  isPhoneWhatsapp: boolean;

  @OneToMany(() => Service, (service) => service.provider, {
    cascade: ['remove'],
  })
  services: Service[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
