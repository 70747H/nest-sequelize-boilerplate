import { Sequelize } from 'sequelize-typescript';
import { User } from '../modules/users/user.entity';
import { ConfigService } from '../modules/shared/config/config.service';
import { Consent } from '../modules/consents/consent.entity';
import { UserConsents } from '../modules/user-consents/user.consents.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(configService.sequelizeOrmConfig);
            sequelize.addModels([User, Consent, UserConsents]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService],
    },
];
