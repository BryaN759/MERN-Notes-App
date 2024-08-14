import app from './src/app';
import 'dotenv/config';
import connectDB from './src/config/db';

const runServer = () => {
    const port = process.env.PORT || 7575;

    app.listen(port, () => {
        connectDB();
        console.log(`🚀 Server is up and running at http://localhost:${port}`);
    });
};

runServer();
