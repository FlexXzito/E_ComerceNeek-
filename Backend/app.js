import express from 'express';
import cors from 'cors';

import {
    LoginRute,
    SingUpRute,
    OfertasFlashRute,
    NewProductsRute,
    TendenciasRute,

} from './Routes.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use('/MyEcomerceNeek', LoginRute);
app.use('/MyEcomerceNeek', SingUpRute);
app.use('/MyEcomerceNeek', OfertasFlashRute);
app.use('/MyEcomerceNeek', NewProductsRute);
app.use('/MyEcomerceNeek', TendenciasRute);

export default app;