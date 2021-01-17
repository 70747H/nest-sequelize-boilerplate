import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { Transform } from 'class-transformer';
import { User } from '../users/user.entity';
import { Consent } from '../consents/consent.entity';

@Table({ tableName: 'user-consents'})
export class UserConsents extends Model<UserConsents> {

  // @Transform(Consent => Consent.name)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({ defaultValue: false })
  enabled: boolean;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt?: Date;

  @ForeignKey(() => Consent)
  @Column({
    type: DataType.UUID,
    field: 'consent_id',
  })
  consentId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    field: 'user_id',
  })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Consent)
  consent: Consent;
}