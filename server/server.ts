import express from 'express';
import cors from 'cors';
import eventRoutes from './database/eventRoutes';

const app = express();
const port = process.env.PORT || 4321;

app.use(cors({
    origin: process.env.ALLOWED_URL,
    optionsSuccessStatus: 200
}));
app.use(express.json());

app.use((req, res, next) => {
    const url = req.get('Origin');
    if (!url || url !== process.env.ALLOWED_URL) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
});

// Use the event routes
app.use('/api/events', eventRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});