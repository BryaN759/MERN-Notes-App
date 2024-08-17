import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import path from 'path';

// routes import
import userRoutes from './routes/user.routes';
import notesRoutes from './routes/notes.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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
app.use('/api/notes', notesRoutes);

export default app;
