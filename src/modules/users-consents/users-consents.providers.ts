import { UsersConsents } from './users.consents.entity';

export const usersConsentsProviders = [{ provide: 'USERS_CONSENTS_REPOSITORY', useValue: UsersConsents }];