import adminSeeder from "./admin_seeder.js";
import { logMessage } from "../helpers/logger.js";

(async () => {
    try {
        await adminSeeder();
    } catch (error) {
        logMessage(error, {});
    }
})()