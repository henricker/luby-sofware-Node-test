import { Options } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

function getOptions(env: string, anotherOptions?: Partial<Options>): Options {
  return {
    dialect: 'postgres',
    database: process.env[`${env}_DB_DATABASE`],
    host: process.env[`${env}_DB_HOST`],
    port: Number.parseInt(process.env[`${env}_DB_PORT`] ?? '5432'),
    password: process.env[`${env}_DB_PASSWORD`],
    username: process.env[`${env}_DB_USERNAME`],
    ...anotherOptions
  }
}

export const development = getOptions('DEV');
export const test = getOptions('TEST');
export const production = getOptions('PROD');