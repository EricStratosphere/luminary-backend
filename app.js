import express from 'express';
import cookieParser from 'cookie-parser';
import connectToDatabase from './database/mongodb.js';

const app = express();

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(cookieParser());

app.get('/', (req, res) => {
    return res.send("luminary backend active!");
});


app.listen(3000, async () => {
    await connectToDatabase();
    console.log("luminary backend active!");
});

export default app;