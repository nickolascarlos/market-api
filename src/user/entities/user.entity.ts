import { Provider } from '../../provider/entities/provider.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { PasswordChangeToken } from './password-change-token.entity';
import { File } from 'src/file/entities/file.entity';

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

  @Column({ default: 'user' })
  role: string;

  @Column()
  phoneNumber: string;

  @Column({ default: false })
  isPhoneWhatsApp: boolean;

  @OneToOne(() => File, {
    cascade: ['remove'],
  })
  @JoinColumn({ name: 'avatarFileId' })
  avatarFile: File;

  @Column({ nullable: true })
  avatarFileId: string;

  @OneToMany(() => Provider, (provider) => provider.user, {
    cascade: ['remove'],
  })
  providers: Array<Provider>;

  @OneToMany(() => PasswordChangeToken, (pcToken) => pcToken.user, {
    cascade: ['remove'],
  })
  pcToken: PasswordChangeToken;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
