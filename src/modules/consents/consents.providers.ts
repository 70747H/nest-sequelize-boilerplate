import { Consent } from './consent.entity';

export const consentsProviders = [{ provide: 'CONSENTS_REPOSITORY', useValue: Consent }];