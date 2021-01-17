import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable, Logger,
  PipeTransform
} from "@nestjs/common";
import { ObjectSchema } from "@hapi/joi";

@Injectable()
export class JoiValidationPipe implements PipeTransform {

  transform(value: any) {
    Logger.log(value);
    return value;
  }

  // constructor(private schema: ObjectSchema) {}
  //
  // transform(value: any, metadata: ArgumentMetadata) {
  //   const { error } = this.schema.validate(value);
  //   if (error) {
  //     throw new HttpException('Post not found', HttpStatus.UNPROCESSABLE_ENTITY);
  //   }
  //   return value;
  // }
}