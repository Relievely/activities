import {Router} from "express";
import {
    addActivityController,
    getAllActivitiesController,
    getPreviousActivitiesController,
    getCategoryActivityController, getActivityItemController
} from "../middleware/controller/activitiesController";


export const activities = Router();

activities
    .get("/", getAllActivitiesController)
    .post("/add", addActivityController)
    .get("/:id", getActivityItemController)
    .get("/category/:category", getCategoryActivityController)
    .get("/previous/:limit",getPreviousActivitiesController)
