import {config} from 'dotenv';

config({path : `.env.development.local`});

export const { MONGODB_URI, PORT, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;