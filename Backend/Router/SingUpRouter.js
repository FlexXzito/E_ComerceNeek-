import express from 'express';
import {SignUp} from '../Controllers/SingUp.js';

const route = express.Router();
route.post('/signup', SignUp);

export default route;