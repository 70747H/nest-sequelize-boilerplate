import { IsNumber, IsString } from "class-validator";

export class UpdateUserConsentsDto {
  @IsString()
  readonly enabled: boolean;
}