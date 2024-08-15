import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';

// routes import
import userRoutes from './routes/user.routes';
import path from 'path';

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

const frontendPath = path.join(__dirname, '../../../frontend/dist');
app.use(express.static(frontendPath));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(frontendPath, 'index.html'));
// });

// endpoints

app.use('/api/user', userRoutes);

export default app;
