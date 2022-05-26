import { Service } from '../../service/entities/service.entity';
import { User } from '../../user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { File } from '../../file/entities/file.entity';

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
  isPhoneWhatsApp: boolean;

  @OneToMany(() => Service, (service) => service.provider, {
    cascade: ['remove'],
  })
  services: Service[];

  @OneToOne(() => File)
  @JoinColumn({ name: 'avatarFileId' })
  avatarFile: File;

  @Column({ nullable: true })
  avatarFileId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
