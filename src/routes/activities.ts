import {Router} from "express";
import {
    addActivityController,
    getAllActivitiesController,
    getLatestActivityController,
    getCategoryActivityController
} from "../middleware/controller/activitiesController";


export const activities = Router();

activities
    .get("/", getAllActivitiesController)
    .post("/add", addActivityController)
    .get("/latest", getLatestActivityController)
    .get("/:category", getCategoryActivityController)