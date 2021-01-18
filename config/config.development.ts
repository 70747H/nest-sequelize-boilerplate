import { Dialect } from 'sequelize/types';

export const config = {
    database: {
        dialect: 'mysql' as Dialect,
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root12345',
        database: 'didomi',
        charset: 'utf8',
        seederStorage: 'sequelize',
        omitNull: false,
        alter: true,
        // define: {
        //     collate: 'utf8mb4_unicode_ci'
        // },
        pool: {
            max: 10,
            min: 1,
            idle: 500,
            acquire: 10000,
            evict: 3000,
            handleDisconnects: true
        },
        dialectOptions: {
            connectTimeout: 60000,
            bigNumberStrings: false,
            decimalNumbers: true,
            useUTC: true,
            timezone: 'Etc/GMT0',
            requestTimeout: 0
        },
        timestamps: true,
        timezone: 'Etc/GMT0',
        logging: console.log
    }
};
