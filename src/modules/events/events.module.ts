import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import {EventsController} from './events.controller';
import {eventsProviders} from './events.providers';
import {DatabaseModule} from '../../database/database.module';
import { usersProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';
import { usersConsentsProviders } from '../users-consents/users-consents.providers';
import { UserConsentsService } from '../users-consents/users-consents.service';
import { consentsProviders } from '../consents/consents.providers';
import { ConsentsService } from '../consents/consents.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...usersProviders,
    UsersService,
    ...consentsProviders,
    ConsentsService,
    ...usersConsentsProviders,
    UserConsentsService,
    ...eventsProviders,
    EventsService,
  ],
  controllers: [EventsController],
})
export class EventsModule {}