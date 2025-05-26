import express from 'express';
import { CarProducts } from '../Controllers/CarProducts.js';

const route = express.Router();
route.post('/CarProducts', CarProducts);

export default route;