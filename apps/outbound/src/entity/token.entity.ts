import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TokenStatus, Platform } from '@app/commons';

@Entity()
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  identifier: string;

  @Column({ type: 'varchar' })
  token: string;

  @Column({ type: 'varchar', default: Platform.NONE })
  platform: Platform;

  @Column({ type: 'varchar', default: TokenStatus.ISSUED })
  status: TokenStatus;

  @Column({ type: 'timestamptz', default: new Date() })
  createAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  updateAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  deleteAt?: Date;
}
