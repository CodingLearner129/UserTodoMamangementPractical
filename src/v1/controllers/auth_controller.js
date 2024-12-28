import { logMessage } from "./../helpers/logger.js";
import getMessage from "./../helpers/getMessage.js"
import * as authService from "./../services/auth_service.js"
import config from "../config/config.js";

export const registerUser = async (req, res) => {
    try {
        const result = await authService.registerUser(req, 'user');
        res.status(result.status).send(result.send);
    } catch (error) {
        logMessage(error, req);
        res.status(config.http_status_server_error).send({
            status: config.status_fail,
            message: await getMessage('common.something_went_wrong'),
        });
    }
}

export const loginUser = async (req, res) => {
    try {
        const result = await authService.loginUser(req, 'user');
        res.status(result.status).send(result.send);
    } catch (error) {
        logMessage(error, req);
        res.status(config.http_status_server_error).send({
            status: config.status_fail,
            message: await getMessage('common.something_went_wrong'),
        });
    }
}

export const logoutUser = async (req, res) => {
    try {
        const result = await authService.logoutUser(req, 'user');
        res.status(result.status).send(result.send);
    } catch (error) {
        logMessage(error, req);
        res.status(config.http_status_server_error).send({
            status: config.status_fail,
            message: await getMessage('common.something_went_wrong'),
        });
    }
}