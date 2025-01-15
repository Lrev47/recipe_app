// app.js
import express from 'express';
import routes from './routes/index.js';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the routes (e.g., at /api)
app.use('/api', routes);

export default app;
