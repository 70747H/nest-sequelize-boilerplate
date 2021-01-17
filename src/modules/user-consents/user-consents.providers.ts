import { UserConsents } from './user.consents.entity';

export const userConsentsProviders = [{ provide: 'USER_CONSENTS_REPOSITORY', useValue: UserConsents }];