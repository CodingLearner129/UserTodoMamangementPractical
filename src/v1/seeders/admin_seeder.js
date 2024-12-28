import bcrypt from 'bcryptjs';
import moment from "moment";
import db from "./../config/db.js";
import config from '../config/config.js';
import { logMessage } from "../helpers/logger.js";
import * as modelService from "./../services/model_service.js";

export default async () => {
    try {
        await modelService.deleteMany(db.user, {
            role: "admin"
        }, {});
        await modelService.createOne(db.user, {
            full_name: "admin",
            phone: 900000000,
            email: "admin@gmail.com",
            password: await bcrypt.hash("Admin@123", Number(config.bcrypt_salt_round)),
            created_at: moment().unix(),
            role: "admin"
        }, {});
        console.log("Admin Seeder run successfully.");
    } catch (error) {
        console.log("Failed to run admin seeder.");
        logMessage(error, {});
    } finally {
        process.exit();
    }
}