import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import router from './routes';
import dotenv from 'dotenv';
// import Auth from './auth/Auth';

dotenv.config();

const app = express();
app.use(express.json());
// app.use(Auth.authFilter);
app.use(router);


app.listen(4000, () => console.log("Running on port 4000"));