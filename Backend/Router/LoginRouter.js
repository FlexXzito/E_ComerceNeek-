import express from 'express';
import { Login } from '../Controllers/Login.js';


const route = express.Router();
route.get('/login', Login);

export default route;