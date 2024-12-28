import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
dotenvExpand.expand(dotenv.config());

// get data from .env file
const config = {
    node_env: process.env.NODE_ENV || 'development',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
    mongo_db: process.env.MONGO_CLUSTER_DB || '',
    app_name: process.env.APP_NAME || "Node Practical",

    // bcrypt
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND || 10,

    // set locale for language
    locale: process.env.LOCALE || 'en',

    // set rate limit
    request_data_limit: process.env.REQUEST_DATA_LIMIT || '1000kb',

    // file size
    file_size: Number(process.env.FILE_SIZE) || 5,

    // Jwt
    jwt_encryption: process.env.JWT_ENCRYPTION || 'secret',
    jwt_expiration: process.env.JWT_EXPIRATION || '1d',
    jwt_refresh_expiration: Number(process.env.JWT_REFRESH_ENCRYPTION) || 7,

    base_url: process.env.BASE_URL || '',

    // HTTP status codes
    http_status_data_found: 200,
    http_status_create_success: 201,
    http_status_content_not_found: 204,
    http_status_data_not_found: 404,
    http_status_server_error: 500,
    http_status_auth_fail: 403,
    http_status_user_already_exist: 409,
    http_status_bad_request: 400,
    status_success: 1,
    status_fail: 0,

    // Default settings
    default_sound: process.env.DEFAULT_SOUND || 'default',
    reportLimit: Number(process.env.REPORT_LIMIT) || 10,
    max_logger_files_expiration: process.env.MAX_LOGGER_FILES_DURATION || '15d',

    currency: process.env.CURRENCY || 'gbp',

    corsOriginUris: process.env.CORS_ORIGIN_URIS == "" ? ["http://127.0.0.1:8000"] : (process.env.CORS_ORIGIN_URIS).split(','),
};

export default config;
