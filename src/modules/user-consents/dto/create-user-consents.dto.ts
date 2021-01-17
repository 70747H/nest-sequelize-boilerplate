import { IsNumber, IsString } from "class-validator";

export class CreateUserConsentsDto {
  @IsNumber()
  readonly userId: number;

  @IsNumber()
  readonly consentId: number;

  @IsString()
  readonly enabled: boolean;
}