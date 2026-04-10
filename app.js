import express from 'express';
import cookieParser from 'cookie-parser';
import connectToDatabase from './database/mongodb.js';
import cors from 'cors';
import authorRouter from './routes/author.route.js';
import bookRouter from './routes/book.route.js';
import bookmarkRouter from './routes/bookmark.route.js';
import collectionRouter from './routes/collection.route.js';
import collectionEBookRouter from './routes/collectionebook.route.js';
import commentRouter from './routes/comment.route.js';
import notesRouter from './routes/notes.route.js';
import userRouter from './routes/user.route.js';
import { PORT } from './config/env.js';
const app = express();

app.use(cors({
    origin : true
}));

app.disable('x-powered-by');

connectToDatabase();
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use('/api/v1/authors', authorRouter);
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/bookmarks', bookmarkRouter);
app.use('/api/v1/collections', collectionRouter);
app.use('/api/v1/collection-ebooks', collectionEBookRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/notes', notesRouter);
app.use('/api/v1/users', userRouter);
app.use(cookieParser());

app.get('/', (req, res) => {
    return res.send("luminary backend active!");
});

console.log("luminary backend active! at http://localhost:" + PORT);
// app.listen(PORT, async () => {
// });

export default app;