import express from 'express';
import * as adminController from '../controllers/admin_controller.js';
import * as userRequest from '../requests/user_request.js';
import { authenticationMiddleware } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.use((req, res, next) => authenticationMiddleware(req, res, next, 'user', 'admin'));

router.get('/user', [], adminController.getUserList);
router.post('/user', [userRequest.addUserRequest], adminController.addUser);


export { router }; 
