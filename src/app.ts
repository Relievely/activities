import {routes} from "./routes";
import * as dotenv from "dotenv";
import fs from "fs";
import express, {Express} from "express";

export const app: Express = express();

import pino from "pino";

const logger = pino();

if (fs.existsSync('.env')) {
    const config = dotenv.config({path: '.env'});

    if (config.error) {
        throw config.error;
    }
} else {
    logger.warn("No environment file provided");
}


routes(app);