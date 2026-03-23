import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use(cookieParser());

app.get('/', (req, res) => {
    return res.send("luminary backend active!");
});

app.listen(3000, async () => {
    console.log("luminary backend active!");
});

export default app;