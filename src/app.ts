import express from 'express';
import router from './routes';
import dotenv from 'dotenv';
import Auth from './auth/Auth';

dotenv.config();

const app = express();
app.use(express.json());
app.post('/user/auth', Auth.authenticate);
app.use(Auth.authFilter);
app.use(router);


app.listen(3333, () => console.log("Running on port 3333"));