import express from 'express';
import {NewProducts} from '../Controllers/NewProducts.js';


const route = express.Router();
route.get('/NewProducts', NewProducts);

export default route;