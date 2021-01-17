import { Module } from '@nestjs/common';
import { UserConsentsService } from './user-consents.service';
import {userConsentsProviders} from './user-consents.providers';
import {DatabaseModule} from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...userConsentsProviders,
    UserConsentsService,
  ],
})
export class UserConsentsModule {}