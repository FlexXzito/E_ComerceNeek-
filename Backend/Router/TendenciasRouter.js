import express from 'express';
import {Tendencias} from '../Controllers/Tendencias.js';


const route = express.Router();
route.get('/Tendencias', Tendencias);

export default route; 