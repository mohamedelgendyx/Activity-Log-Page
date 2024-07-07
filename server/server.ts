import express from 'express';
import cors from 'cors';
import eventRoutes from './database/eventRoutes';

const app = express();
const port = process.env.PORT || 4321;

app.use(cors());
app.use(express.json());

// Use the event routes
app.use('/api/events', eventRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});