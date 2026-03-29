import {config} from 'dotenv';

config({path : `.env.development.local`});

export const { MONGODB_URI } = process.env;