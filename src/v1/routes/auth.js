import express from 'express';
import * as authRequest from "../requests/auth_request.js";
import * as authController from "../controllers/auth_controller.js";
import { authenticationMiddleware } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.post("/register", [authRequest.registerRequest], authController.registerUser);
router.post("/login", [authRequest.loginRequest], authController.loginUser);

router.use((req, res, next) => authenticationMiddleware(req, res, next, 'user'));

router.post("/logout", [], authController.logoutUser);


export { router };