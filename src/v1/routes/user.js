import express from 'express';
import * as userController from '../controllers/user_controller.js';
import * as userRequest from '../requests/user_request.js';
import * as todoRequest from '../requests/todo_request.js';
import { authenticationMiddleware } from "./../middlewares/auth_middleware.js";

const router = express.Router();

router.use((req, res, next) => authenticationMiddleware(req, res, next, 'user', 'user'));

router.put('/profile', [userRequest.profileUpdateRequest], userController.updateProfile);
router.get('/profile', [], userController.getProfile);

// todo
router.get('/todo', [], userController.getTodoList);
router.post('/todo', [todoRequest.addUpdateTodoRequest], userController.addTodo);
router.put('/todo/:id', [todoRequest.addUpdateTodoRequest], userController.updateTodo);
router.get('/todo/:id', [], userController.getTodo);
router.delete('/todo/:id', [], userController.deleteTodo);

export { router };