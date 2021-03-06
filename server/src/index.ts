import express from 'express';
import expressWS from 'express-ws';
import 'dotenv/config';

// Initialize App
const app = express();

// Use Express WS
export const wsInstance = expressWS(app);

import wsHandler from './controllers/ws';
//@ts-ignore
app.ws('/ws', wsHandler);

// Start Queue Loop
import './utils/loop';

// Extract Port
const PORT: number = +process.env.PORT | 8080;

app.listen(PORT, () => {
  console.log(`App Listening on Port: ${PORT}`);
});