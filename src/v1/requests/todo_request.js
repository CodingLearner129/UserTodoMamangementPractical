import { Validator } from 'node-input-validator';
import getMessage from './../helpers/getMessage.js';
import { logMessage } from '../helpers/logger.js';
import config from '../config/config.js';

export const addUpdateTodoRequest = async (req, res, next) => {
    try {
        let data = {
            title: req.body.title,
            body: req.body.body,
        };
        const validator = new Validator(data, {
            title: "required|string|minLength:5|maxLength:100",
            body: "required|string|minLength:10|maxLength:500",
        },);

        const matched = await validator.check();
        if (!matched) {
            let firstErrorField = Object.keys(validator.errors)[0]; // Get the first error field name
            let firstErrorMessage = validator.errors[firstErrorField]['message']; // Get the first error message
            res.status(config.http_status_bad_request).send({
                status: config.status_fail,
                message: firstErrorMessage
            });
        } else {
            next();
        }
    } catch (error) {
        logMessage(error, req);
        res.status(config.http_status_bad_request).send({
            status: config.status_fail,
            message: await getMessage('common.something_went_wrong'),
        });
    }
}