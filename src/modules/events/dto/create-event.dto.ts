import {
  ArrayNotEmpty,
  IsArray,
  IsDefined, IsISO8601,
  IsNotEmptyObject,
  IsObject, IsOptional,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

class User {
  id: number;
}

class Consent {
  id: number;
  enabled: boolean;
}

export class CreateEventDto {
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(()=>User)
  readonly user;

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => Consent)
  readonly consents;

  @IsOptional()
  @IsISO8601()
  readonly createdAt;
}