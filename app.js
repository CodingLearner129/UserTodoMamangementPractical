import cluster from 'node:cluster';
import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongooseSanitize from 'express-mongo-sanitize';
import compression from "compression";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import config from "./src/v1/config/config.js";
import { router as routerV1 } from "./src/v1/routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// set view engine 
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './src/views'));

// Development logging
app.use(morgan('dev'));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: config.request_data_limit })); // limit to 10kb for requests body so more then 10k data in request body is not allowed
app.use(express.urlencoded({ extended: true, limit: config.request_data_limit }));

// Data sanitization against request NoSql query injection
app.use(mongooseSanitize());

// to send compressed response to client
app.use(compression());

// serving static files
app.use(express.static(path.join(__dirname, './src/public')));

// Limit requests from same API
const limiter = rateLimit({
    max: 100, // maximum rate limit for requests is 100
    windowMs: 30 * 1000, // number of milliseconds
    message: "Too many requests from this IP address, please try again in an hour!"
});
// means in 1h window max 100 requests are allowed

app.use('/v1', limiter);

//route middlewares
app.use('/v1', routerV1);

app.all('*', (req, res) => {
    res.status(404).json({
        status: config.status_fail,
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

export default app;
