import mongoose from "mongoose";
import moment from "moment";
import db from "../config/db.js";
import config from "../config/config.js";
import * as modelService from "./model_service.js";
import getMessage from "../helpers/getMessage.js";
import { TodoDTO, TodoListDTO } from "../dto/todo.js";
import { response } from "../helpers/response.js";

export const getTodoList = async (req, model) => {
    try {
        const getTodos = await modelService.aggregate(db[model], [
            {
                $match: {
                    user_id: req.user._id,
                    deleted_at: 0
                }
            },
            {
                $sort: {
                    created_at: -1
                }
            }
        ], req);
        if (getTodos.length > 0) {
            return response(config.http_status_data_found, {
                status: config.status_success,
                message: await getMessage('common.todo_list_found'),
                data: new TodoListDTO(getTodos)
            });
        } else {
            return response(config.http_status_data_not_found, {
                status: config.status_fail,
                message: await getMessage('common.todo_not_found'),
            });
        }
    } catch (error) {
        throw error;
    }
}

export const getTodo = async (req, model) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const getTodo = await modelService.getOne(db[model], {
            _id: id,
            user_id: req.user._id,
            deleted_at: 0
        }, req);
        if (getTodo) {
            return response(config.http_status_data_found, {
                status: config.status_success,
                message: await getMessage('common.todo_fetch_success'),
                data: new TodoDTO(getTodo)
            });
        } else {
            return response(config.http_status_data_not_found, {
                status: config.status_fail,
                message: await getMessage('common.todo_not_found'),
            });
        }
    } catch (error) {
        throw error;
    }
}

export const addTodo = async (req, model) => {
    try {
        const { title, body } = req.body;
        await modelService.createOne(db[model], {
            user_id: req.user._id,
            title,
            body,
            created_at: moment().unix()
        }, req);
        return response(config.http_status_create_success, {
            status: config.status_success,
            message: await getMessage('common.todo_create_success'),
        });
    } catch (error) {
        throw error;
    }
}

export const updateTodo = async (req, model) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const { title, body } = req.body;
        const result = await modelService.getOneAndUpdate(db[model], { _id: id }, {
            user_id: req.user._id,
            title,
            body,
            updated_at: moment().unix()
        }, req);
        if (result) {
            return response(config.http_status_data_found, {
                status: config.status_success,
                message: await getMessage('common.todo_update_success'),
            });
        } else {
            return response(config.http_status_data_not_found, {
                status: config.status_fail,
                message: await getMessage('common.todo_not_found'),
            });
        }
    } catch (error) {
        throw error;
    }
}

export const deleteTodo = async (req, model) => {
    try {
        const id = new mongoose.Types.ObjectId(req.params.id);
        const result = await modelService.getOneAndDelete(db[model], { _id: id, user_id: req.user._id }, req);
        if (result) {
            return response(config.http_status_data_found, {
                status: config.status_success,
                message: await getMessage('common.todo_delete_success'),
            });
        } else {
            return response(config.http_status_data_not_found, {
                status: config.status_fail,
                message: await getMessage('common.todo_not_found'),
            });
        }
    } catch (error) {
        throw error;
    }
}