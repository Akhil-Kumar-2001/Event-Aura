import express,{Request,Response} from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import authRouter from '../src/router/auth/authRouter'
import userRouter from '../src/router/user/userRouter'
import organizerRouter from '../src/router/organizer/organizerRouter'
import connectDB from './config/dbConfig';

dotenv.config()

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

connectDB()


app.get('/', (req:Request, res:Response) => {
    res.send('Welcome to the backend server!');
}
);


app.use('/api/auth',authRouter)
app.use('/api',userRouter)
app.use('/api/organizer',organizerRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
); 