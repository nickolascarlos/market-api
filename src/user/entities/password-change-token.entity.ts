import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('PasswordChangeToken')
export class PasswordChangeToken extends BaseEntity {
  @PrimaryColumn()
  token: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  expiresIn: number;

  @CreateDateColumn()
  createdAt: Date;
}
