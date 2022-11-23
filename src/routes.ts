import {Express} from "express";
import {logger} from "./middleware/logger";
import {getAllActivitiesController} from "./middleware/controller/activitiesController";
import {creation} from "./routes/creation";
import {activities} from "./routes/activities";

export const routes = (app: Express) => {
    app.use(creation);
    app.use(activities);
    app.get("/all", getAllActivitiesController);
    app.get("/", (req, res) => res.send('Hello World'));
    app.get("/good", logger, (req, res) => res.status(200).json({success: 'Well done this route is working perfectly'}));
    app.get("/bad", (req, res) => res.status(500).json({error: 'Too bad this route does mean something does not work correctly'}));
}