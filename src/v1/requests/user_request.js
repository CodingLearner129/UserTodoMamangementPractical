import { Validator } from 'node-input-validator';
import getMessage from './../helpers/getMessage.js';
import { logMessage } from '../helpers/logger.js';
import config from '../config/config.js';

export const profileUpdateRequest = async (req, res, next) => {
    try {
        let data = {
            full_name: req.body.full_name,
            phone: req.body.phone,
        };
        const validator = new Validator(data, {
            full_name: "required|string|minLength:2|maxLength:50",
            phone: "required|integer|minLength:10|maxLength:15",
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

export const addUserRequest = async (req, res, next) => {
    try {
        let data = {
            full_name: req.body.full_name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
        };
        const validator = new Validator(data, {
            full_name: "required|string|minLength:2|maxLength:50",
            email: "required|email|minLength:5|maxLength:320",
            phone: "required|integer|minLength:10|maxLength:15",
            password: "required|string|minLength:8|maxLength:15",
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