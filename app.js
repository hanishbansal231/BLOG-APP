import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import userRouter from './routers/user.router.js';
import blogRouter from './routers/blog.router.js';
import errorMiddleware from './middelwares/error.middelware.js';
config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan('dev'));


app.get('/',(req,res) => {
    res.status(200).send({
        Message: 'Node Server Starting...'
    });
})

app.use('/api/v1/user',userRouter);
app.use('/api/v1/blog',blogRouter);

app.all('*', (req, res) => {
    res.status(404).send('OOPS!! 404 page not found');
});
app.use(errorMiddleware);
export default app;