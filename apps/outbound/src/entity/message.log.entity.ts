import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MessageStatus, Provider } from '@app/commons';

@Entity()
export class MessageLog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  identifier: string;

  @Column({ type: 'varchar' })
  token: string;

  @Column({ type: 'varchar', nullable: true })
  data: string;

  @Column({ type: 'varchar', default: Provider.NONE })
  provider: string;

  @Column({ type: 'varchar', default: MessageStatus.PENDING })
  state: MessageStatus;

  @Column({ type: 'varchar', nullable: true })
  errorCode: string;

  @Column({ type: 'timestamptz', default: new Date() })
  createAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  updateAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  deleteAt?: Date;
}
