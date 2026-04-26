import {config} from 'dotenv';

config({path : `.env.development.local`});

<<<<<<< HEAD
export const { MONGODB_URI, PORT, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, GEMINI_API_KEY } = process.env;
=======
export const { MONGODB_URI, PORT, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, GEMINI_API_KEY } = process.env;
>>>>>>> dd5b8249a8b7d82595f52ce8e4d4d23b6697c67a
