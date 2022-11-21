import {routes} from "./routes";
import * as dotenv from "dotenv";

const express = require("express");

export const app = express();

const config = dotenv.config({path: '.env'});

if (config.error) {
    throw config.error;
}

routes(app);