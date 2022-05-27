import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Authentication')
export class Authentication extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  ip: string;

  @Column({ default: '' })
  userAgent: string;

  @Column()
  timestamp: Date;
}
