import app from './src/app';
import 'dotenv/config';
import connectDB from './src/config/db';
import job from './src/config/cron';

job.start();
const runServer = () => {
    const port = process.env.PORT || 7575;

    connectDB();
    app.listen(port, () => {
        console.log(`🚀 Server is up and running at http://localhost:${port}`);
    });
};

runServer();
