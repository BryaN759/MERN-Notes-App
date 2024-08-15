import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';

// routes import
import userRoutes from './routes/user.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
);

// endpoints
app.get('/', (req, res, next) => {
    res.send(`Welcome to Bryan's notes app!`);
});

app.use('/api/user', userRoutes);

export default app;
