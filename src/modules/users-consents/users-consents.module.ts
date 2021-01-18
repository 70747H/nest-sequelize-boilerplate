import { Module } from '@nestjs/common';
import { UserConsentsService } from './users-consents.service';
import {usersConsentsProviders} from './users-consents.providers';
import {DatabaseModule} from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...usersConsentsProviders,
    UserConsentsService,
  ],
})
export class UserConsentsModule {}