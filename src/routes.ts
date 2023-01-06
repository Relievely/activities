import cors from "cors";
import {Express} from "express";
import {creation} from "./routes/creation";
import {activities} from "./routes/activities";
import {rating} from "./routes/rating";

import pino_http from "pino-http";
import bodyParser from "body-parser";
import multer, {Multer} from "multer";
import {history} from "./routes/history";
import {reminder} from "./routes/reminder";

const form: Multer = multer();

export const routes = (app: Express) => {
 app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
 }));

 app.use(pino_http());
 app.use(bodyParser.urlencoded({extended: true}))
 app.use(bodyParser.json())
 app.use(form.any())
 app.use(creation);
 app.use("/activity", activities);
 app.use("/rating", rating);
 app.use("/history", history);
 app.use("/reminder", reminder);
}