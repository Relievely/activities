import {Router} from "express";
import {addActivityController, getAllActivitiesController} from "../middleware/controller/activitiesController";


export const activities = Router();

activities
    .get("/", getAllActivitiesController)
    .post("/add", addActivityController);