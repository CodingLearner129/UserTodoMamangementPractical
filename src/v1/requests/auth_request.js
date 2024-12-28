import { Validator } from 'node-input-validator';
import getMessage from './../helpers/getMessage.js';
import { logMessage } from '../helpers/logger.js';
import config from '../config/config.js';

export const registerRequest = async (req, res, next) => {
    try {
        let data = {
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            confirm_password: req.body.confirm_password
        }

        const validator = new Validator(data, {
            email: "required|email|minLength:5|maxLength:320",
            phone: "required|integer|minLength:10|maxLength:15",
            password: "required|string|minLength:8|maxLength:15",
            confirm_password: "required|same:password",
        });

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
        console.log(error);

        logMessage(error, req);
        res.status(config.http_status_bad_request).send({
            status: config.status_fail,
            message: await getMessage('common.something_went_wrong'),
        });
    }
}

export const loginRequest = async (req, res, next) => {
    try {
        let data = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
        }

        const validator = new Validator(data, {
            email: "required|email|minLength:5|maxLength:320",
            password: "required|string|minLength:8|maxLength:15",
            role: "required|string|in:user,admin"
        });

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