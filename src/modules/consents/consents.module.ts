import { Module } from '@nestjs/common';
import { ConsentsService } from './consents.service';
import {consentsProviders} from './consents.providers';
import {DatabaseModule} from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...consentsProviders,
    ConsentsService,
  ],
})
export class ConsentsModule {}