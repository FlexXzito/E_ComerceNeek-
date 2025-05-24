import express from 'express';
import {OfertasFlash} from '../Controllers/OfertasFlash.js';


const route = express.Router();
route.get('/OfertasFlash', OfertasFlash);

export default route;