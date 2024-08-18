import app from './src/app';
import './src/config/cron';
import 'dotenv/config';
import connectDB from './src/config/db';

const runServer = () => {
    const port = process.env.PORT || 7575;

    connectDB();
    app.listen(port, () => {
        console.log(`🚀 Server is up and running at http://localhost:${port}`);
    });
};

runServer();
