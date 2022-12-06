import {Router} from "express";
import {
    addActivityController, getActivityItemController,
    getAllActivitiesController, getPreviousActivitiesController
} from "../middleware/controller/activitiesController";


export const activities = Router();

activities
    .get("/", getAllActivitiesController)
    .post("/add", addActivityController)
    .get("/:id", getActivityItemController)
    .get("/previous/:limit",getPreviousActivitiesController)