// server.js
import dotenv from 'dotenv';
dotenv.config(); // Load .env variables if present

import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
