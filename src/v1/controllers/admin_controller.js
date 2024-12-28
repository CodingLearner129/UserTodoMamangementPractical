import {logMessage} from "../helpers/logger.js";
import config from "../config/config.js";
import getMessage from "../helpers/getMessage.js";
import * as userService from "../services/user_service.js";

export const getUserList = async (req, res) => {
    try {
        const result = await userService.getUserList(req, 'user');
        res.status(result.status).send(result.send);
    } catch (error) {
        logMessage(error, req);
        res.status(config.http_status_server_error).send({
            status: config.status_fail,
            message: await getMessage('common.something_went_wrong')
        });
    }
}

export const addUser = async (req, res) => {
    try {
        const result = await userService.addUser(req, 'user');
        res.status(result.status).send(result.send);
    } catch (error) {
        logMessage(error, req);
        res.status(config.http_status_server_error).send({
            status: config.status_fail,
            message: await getMessage('common.something_went_wrong')
        });
    }
}