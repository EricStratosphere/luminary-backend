import {config} from 'dotenv';

config({path : `.env.development.local`});

export const { MONGODB_URI, PORT, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;