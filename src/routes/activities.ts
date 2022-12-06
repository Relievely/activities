import {Router} from "express";
import {
    addActivityController,
    getAllActivitiesController, getPreviousActivitiesController
} from "../middleware/controller/activitiesController";


export const activities = Router();

activities
    .get("/", getAllActivitiesController)
    .post("/add", addActivityController)
    .get("/previous/:limit",getPreviousActivitiesController)