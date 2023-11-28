import knex from 'knex';
import config from '../knexfile';
import { Environment } from '@/types';

export const db = knex(config[(process.env.NODE_ENV as Environment) ?? 'development']);
