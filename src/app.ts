import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import router from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);


app.listen(3333, () => console.log("Running on port 3333"));