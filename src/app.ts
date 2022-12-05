import {routes} from "./routes";
import * as dotenv from "dotenv";
import fs from "fs";

const express = require("express");

export const app = express();

if (fs.existsSync('.env')) {
    const config = dotenv.config({path: '.env'});

    if (config.error) {
        throw config.error;
    }
} else {
    console.log("No environment file provided");
}


routes(app);