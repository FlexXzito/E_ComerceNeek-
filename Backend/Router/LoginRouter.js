import express from 'express';
import { Login } from '../Controllers/Login.js';


const route = express.Router();
route.post('/login', Login);

export default route;