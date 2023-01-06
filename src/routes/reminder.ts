import {Router} from "express";
import {
 getAllReminderController,
 getReminderItemController,
 insertReminderItemController,
 updateReminderItemNameController,
 updateReminderItemTimeController
} from "../middleware/controller/reminderController";


export const reminder = Router();

reminder
 .get("/", getAllReminderController)
 .get("/:id", getReminderItemController)
 .post("/", insertReminderItemController)
 .patch("/time", updateReminderItemTimeController)
 .patch("/name", updateReminderItemNameController)