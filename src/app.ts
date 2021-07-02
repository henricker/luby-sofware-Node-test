import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import router from './routes';
import dotenv from 'dotenv';
import Auth from './auth/Auth';
import { authSchema } from './app/validators/Validators';
import validatorMiddleware from './app/validators/Validator.middleware';

dotenv.config();

const app = express();
app.use(express.json());
app.post('/user/auth', (request, response, next) => validatorMiddleware(request, response, next, authSchema ), Auth.authenticate);
app.use(Auth.authFilter);
app.use(router);


app.listen(3333, () => console.log("Running on port 3333"));