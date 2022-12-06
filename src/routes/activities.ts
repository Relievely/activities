import {Router} from "express";
import {
    addActivityController,
    getAllActivitiesController,
    getPreviousActivitiesController,
    getLatestActivityController,
    getCategoryActivityController
} from "../middleware/controller/activitiesController";


export const activities = Router();

activities
    .get("/", getAllActivitiesController)
    .post("/add", addActivityController)
    .get("/previous/:limit",getPreviousActivitiesController)
    .get("/latest", getLatestActivityController)
    .get("/:category", getCategoryActivityController)