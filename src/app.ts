import {routes} from "./routes";
import * as dotenv from "dotenv";
import fs from "fs";
import express, {Express} from "express";
import {warnMessage} from "./logger";

export const app: Express = express();

if (fs.existsSync('.env')) {
 const config = dotenv.config({path: '.env'});

 if (config.error) {
  throw config.error;
 }
} else {
 warnMessage("No environment file provided");
}


routes(app);