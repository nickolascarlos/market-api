import { Provider } from 'src/provider/entities/provider.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('User')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  phoneNumber: string;

  @Column({ default: false })
  isPhoneWhatsApp: boolean;

  @OneToMany(() => Provider, (provider) => provider.user, {
    cascade: ['remove']
  })
  providers: Array<Provider>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
