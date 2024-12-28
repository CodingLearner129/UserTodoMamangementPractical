import * as modelService from "./../services/model_service.js";
import { verifyToken } from "./../services/auth_service.js";
import getMessage from './../helpers/getMessage.js';
import { logMessage } from "./../helpers/logger.js";
import db from "../config/db.js";
import config from "../config/config.js";

export const authenticationMiddleware = async (req, res, next, model, role = "") => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(config.http_status_auth_fail).send({
                status: config.status_fail,
                message: await getMessage('auth.no_token_provided'),
            });
        } else {
            const decoded = await verifyToken(token);            
            const getModel = await modelService.getOne(db[model], { _id: decoded.id, access_token: token, role: role == "" ? decoded.role : role }, req);
            if (getModel != null) {
                if (getModel.blocked_at > 0) {
                    return res.status(config.http_status_auth_fail).send({
                        status: config.status_fail,
                        message: await getMessage('auth.account_blocked'),
                    });
                } else if (getModel.deleted_at > 0) {
                    return res.status(config.http_status_auth_fail).send({
                        status: config.status_fail,
                        message: await getMessage('auth.account_deleted'),
                    });
                } else {
                    req.user = getModel;
                    next();
                }
            } else {
                return res.status(config.http_status_auth_fail).send({
                    status: config.status_fail,
                    message: await getMessage('auth.account_not_exist'),
                });
            }
        }
    } catch (error) {
        logMessage(error, req);
        return res.status(config.http_status_auth_fail).send({
            status: config.status_fail,
            message: await getMessage('auth.session_expired'),
        });
    }
}