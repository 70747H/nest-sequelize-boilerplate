import { UsersConsents } from '../users-consents/users.consents.entity';
import { Column, CreatedAt, DataType, DeletedAt, HasMany, Model, Table, UpdatedAt } from "sequelize-typescript";
import { Transform } from 'class-transformer';

@Table({tableName: 'consents'})
export class Consent extends Model<Consent> {

  @Transform(Consent => Consent.name)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt?: Date;

  @HasMany(() => UsersConsents)
  consents: UsersConsents[];
}