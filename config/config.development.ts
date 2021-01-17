import { Dialect } from 'sequelize/types';

export const config = {
    database: {
        dialect: 'mariadb' as Dialect,
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123456',
        database: 'nest',
        logging: true
    }
};
