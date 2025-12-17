// api/status.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// In-memory storage (persists during function invocation)
let status = {
    inMeeting: false,
    lastUpdated: new Date().toISOString()
};

app.use(cors());
app.use(express.json());

// GET current status
app.get('/api/status', (req, res) => {
    res.json(status);
});

// POST to toggle status
app.post('/api/status/toggle', (req, res) => {
    const { password } = req.body;

    if (password !== ADMIN_PASSWORD) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    status.inMeeting = !status.inMeeting;
    status.lastUpdated = new Date().toISOString();
    
    res.json(status);
});

export default app;