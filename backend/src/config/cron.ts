import { CronJob } from 'cron';
import https from 'https';

const URL = 'https://mern-notes-web.onrender.com/';

const job = new CronJob('*/14 * * * *', function () {
    https
        .get(URL, (res) => {
            if (res.statusCode === 200) {
                console.log('##### Refresh GET request sent successfully');
            } else {
                console.log('##### GET request failed', res.statusCode);
            }
        })
        .on('error', (e) => {
            console.error('Error while sending request', e);
        });
});

export default job;
