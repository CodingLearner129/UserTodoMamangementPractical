import moment from 'moment';
import bcrypt from 'bcryptjs';
import mongoose from "mongoose";
import db from "./../config/db.js";
import config from '../config/config.js';
import * as modelService from "./model_service.js";
import { response } from "../helpers/response.js";
import getMessage from "../helpers/getMessage.js";
import { UserProfileDTO, UsersListDTO } from '../dto/user.js';

export const profileUpdate = async (req, model) => {
    try {
        const data = {
            ...req.body,
            updated_at: moment().unix(),
        }
        const existUserWithPhone = await modelService.getOne(db[model], { _id: { $ne: req.user._id }, phone: data.phone, deleted_at: 0 }, req);
        if (existUserWithPhone) {
            return response(config.http_status_user_already_exist, {
                status: config.status_fail,
                message: await getMessage('common.phone_already_exist'),
            });
        }
        await modelService.getOneAndUpdate(db[model], { _id: req.user._id }, data, req);
        return response(config.http_status_data_found, {
            status: config.status_success,
            message: await getMessage('common.profile_update_success'),
        });
    } catch (error) {
        throw error;
    }
}

export const getProfile = async (req, model) => {
    try {
        return response(config.http_status_data_found, {
            status: config.status_success,
            message: await getMessage('common.profile_fetch_success'),
            data: new UserProfileDTO(req.user)
        });
    } catch (error) {
        throw error;
    }
}

export const getUserList = async (req, model) => {
    try {
        const getUsers = await modelService.aggregate(db[model], [
            {
                $match: {
                    role: "user",
                    deleted_at: 0
                }
            },
            {
                $sort: {
                    created_at: -1
                }
            }
        ], req);
        return response(config.http_status_data_found, {
            status: config.status_success,
            message: await getMessage('common.user_list_found'),
            data: new UsersListDTO(getUsers)
        });
    } catch (error) {
        throw error;
    }
}

export const addUser = async (req, model) => {
    try {
        const { full_name, email, phone, password } = req.body;
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
        await modelService.createOne(db[model], {
            full_name,
            email,
            phone,
            password: await bcrypt.hash(password, Number(config.bcrypt_salt_round)),
        }, req);
        return response(config.http_status_create_success, {
            status: config.status_success,
            message: await getMessage('common.user_create_success'),
        });
    } catch (error) {
        throw error;
    }
}