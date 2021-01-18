import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { SharedModule } from './modules/shared/shared.module';
import { ConsentsModule } from './modules/consents/consents.module';
import { UserConsentsModule } from './modules/users-consents/users-consents.module';
import { EventsModule } from './modules/events/events.module';

@Module({
    imports: [SharedModule, UsersModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
