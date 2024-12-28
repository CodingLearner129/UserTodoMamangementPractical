import { logMessage } from "../helpers/logger.js";
import getMessage from "../helpers/getMessage.js"
import config from "../config/config.js";
import * as userService from "../services/user_service.js";
import * as todoService from "../services/todo_service.js";

export const updateProfile = async (req, res) => {
    try {
        const result = await userService.profileUpdate(req, 'user');
        res.status(result.status).send(result.send);
    } catch (error) {
        logMessage(error, req);
        res.status(config.http_status_server_error).send({
            status: config.status_fail,
            message: await getMessage('common.something_went_wrong')
        });
    }
}

export const getProfile = async (req, res) => {
    try {
        const result = await userService.getProfile(req, 'user');
        res.status(result.status).send(result.send);
    } catch (error) {
        logMessage(error, req);
        res.status(config.http_status_server_error).send({
            status: config.status_fail,
            message: await getMessage('common.something_went_wrong')
        });
    }
}

export const getTodoList = async (req, res) => {
    try {
        const result = await todoService.getTodoList(req, 'todo');
        res.status(result.status).send(result.send);
    } catch (error) {
        logMessage(error, req);
        res.status(config.http_status_server_error).send({
            status: config.status_fail,
            message: await getMessage('common.something_went_wrong')
        });
    }
}

export const getTodo = async (req, res) => {
    try {
        const result = await todoService.getTodo(req, 'todo');
        res.status(result.status).send(result.send);
    } catch (error) {
        logMessage(error, req);
        res.status(config.http_status_server_error).send({
            status: config.status_fail,
            message: await getMessage('common.something_went_wrong')
        });
    }
}

export const addTodo = async (req, res) => {
    try {
        const result = await todoService.addTodo(req, 'todo');
        res.status(result.status).send(result.send);
    } catch (error) {
        logMessage(error, req);
        res.status(config.http_status_server_error).send({
            status: config.status_fail,
            message: await getMessage('common.something_went_wrong')
        });
    }
}

export const updateTodo = async (req, res) => {
    try {
        const result = await todoService.updateTodo(req, 'todo');
        res.status(result.status).send(result.send);
    } catch (error) {
        logMessage(error, req);
        res.status(config.http_status_server_error).send({
            status: config.status_fail,
            message: await getMessage('common.something_went_wrong')
        });
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const result = await todoService.deleteTodo(req, 'todo');
        res.status(result.status).send(result.send);
    } catch (error) {
        logMessage(error, req);
        res.status(config.http_status_server_error).send({
            status: config.status_fail,
            message: await getMessage('common.something_went_wrong')
        });
    }
}