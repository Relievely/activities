import {Router} from "express";
import {
    addActivityController, getActivityItemController,
    getAllActivitiesController,
    getLatestActivityController
} from "../middleware/controller/activitiesController";


export const activities = Router();

activities
    .get("/", getAllActivitiesController)
    .post("/add", addActivityController)
    .get("/latest", getLatestActivityController)
    .get("/:id", getActivityItemController)