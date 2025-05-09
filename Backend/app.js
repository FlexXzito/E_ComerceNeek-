import express from 'express';
import cors from 'cors';

import {
    LoginRute,
    SingUpRute
} from './Routes.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use('/MyEcomerceNeek', LoginRute);
app.use('/MyEcomerceNeek', SingUpRute);

export default app;