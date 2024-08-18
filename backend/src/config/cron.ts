// src/cronJobs.ts

import cron from 'node-cron';

// Function to send a GET request to /api/notes/refresh
const sendRefreshRequest = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/notes/refresh');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('Refresh request sent successfully');
    } catch (error) {
        console.error('Error sending refresh request:', error);
    }
};

// Schedule the cron job to call /api/notes/refresh every 14 minutes
cron.schedule('*/14 * * * *', () => {
    console.log('Running the cron job to refresh notes...');
    sendRefreshRequest();
});
