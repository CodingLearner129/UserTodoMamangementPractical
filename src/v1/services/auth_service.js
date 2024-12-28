import jwt from 'jsonwebtoken';
import { promisify } from "util";
import moment from 'moment';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import db from "./../config/db.js";
import getMessage from "../helpers/getMessage.js";
import config from '../config/config.js';
import * as modelService from "./model_service.js";
import { response } from '../helpers/response.js';
import { UserLogInDTO } from '../dto/user.js';

export const signToken = async (data, expiresIn) => {
    return jwt.sign(data, config.jwt_encryption, { expiresIn });
};

export const verifyToken = async (token) => {
    try {
        return await promisify(jwt.verify)(token, config.jwt_encryption);
    } catch (error) {
        throw error;
    }
};

const validatePassword = async (password) => {
    // Single regex to check password criteria
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,15}$/;

    // Test the password against the regex
    if (!regex.test(password)) {
        return { status: config.status_fail, message: await getMessage('validation.password.pattern') };
    }

    return { status: config.status_success }; // If it passes the regex test
};

export const registerUser = async (req, model) => {
    try {
        const { email, phone, password, confirm_password } = req.body;
        const valid = await validatePassword(password);
        if (!valid.status) {
            return response(config.http_status_bad_request, {
                status: config.status_fail,
                message: valid.message,
            });
        }

        const checkUserExist = await modelService.getOne(db[model], { email }, req);
        if (checkUserExist) {
            return response(config.http_status_user_already_exist, {
                status: config.status_fail,
                message: await getMessage('common.email_already_exist'),
            });
        }
        const checkUserPhoneExist = await modelService.getOne(db[model], { phone }, req);
        if (checkUserPhoneExist) {
            return response(config.http_status_user_already_exist, {
                status: config.status_fail,
                message: await getMessage('common.phone_already_exist'),
            });
        }
        if (password !== confirm_password) {
            return response(config.http_status_bad_request, {
                status: config.status_fail,
                message: await getMessage('common.password_and_confirm_password_not_match'),
            });
        }
        await modelService.createOne(db[model], {
            email,
            phone,
            password: await bcrypt.hash(password, Number(config.bcrypt_salt_round)),
            created_at: moment().unix()
        }, req);
        return response(config.http_status_create_success, {
            status: config.status_success,
            message: await getMessage('auth.signup_success'),
        });
    } catch (error) {
        throw error;
    }
}

export const loginUser = async (req, model) => {
    try {
        const { email, password, role } = req.body;

        const existingUser = await modelService.getOne(db[model], { email, role, deleted_at: 0 }, req);
        if (!existingUser) {
            return response(config.http_status_data_not_found, {
                status: config.status_fail,
                message: await getMessage('auth.login_failed'),
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return response(config.http_status_data_not_found, {
                status: config.status_fail,
                message: await getMessage('common.login_failed'),
            });
        }
        const token = await signToken({ email: existingUser.email, id: existingUser._id, role: existingUser.role }, config.jwt_expiration);
        const updatedUser = await modelService.getOneAndUpdate(db[model], { _id: existingUser._id }, { access_token: token }, req);
        return response(config.http_status_data_found, {
            status: config.status_success,
            message: await getMessage('auth.login_success'),
            data: new UserLogInDTO(updatedUser)
        });
    } catch (error) {
        throw error;
    }
}

export const logoutUser = async (req, model) => {
    try {
        await modelService.getOneAndUpdate(db[model], { _id: req.user._id }, { access_token: "" }, req);
        return response(config.http_status_data_found, {
            status: config.status_success,
            message: await getMessage('auth.logout_success'),
        });
    } catch (error) {
        throw error;
    }
}