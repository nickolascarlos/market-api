import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Provider')
export class Provider extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.providers)
  user: User;

  @Column({ nullable: true })
  user_id: string;

  @Column()
  name: string;

  @Column({ default: '' })
  about: string;

  @Column()
  location: string;

  @Column()
  contact_email: string;

  @Column()
  phone_number: string;

  @Column()
  is_phone_whatsapp: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
