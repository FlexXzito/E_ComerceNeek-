import express from 'express';
import { GetTipo } from '../Controllers/TiposSearch.js';


const route = express.Router();
route.post('/getTipo', GetTipo);

export default route; 