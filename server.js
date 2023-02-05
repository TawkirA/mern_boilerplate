import express from 'express'
import 'express-async-errors';
import cors from 'cors';
import morgan from 'morgan';
const app = express();
import dotenv from 'dotenv';
import connectDB from './db/connetion.js';
dotenv.config();

// Auth Routes
import authenticateUser from './middleware/auth.js';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    // throw new Error('error');
    res.send('Welcome!');
})

app.get('/api/v1', (req, res) => {
    // throw new Error('error');
    res.json({msg: 'Welcome!' });
})

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', authenticateUser, jobRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
    try {
        const dbUrl = `${process.env.MONGO_URL}`;
        console.log(process.env.MONGO_URL);
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`Server is runnning ar port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }    
}

start()