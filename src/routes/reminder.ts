import {Router} from "express";
import {insertReminderItemController} from "../middleware/controller/reminderController";


export const reminder = Router();

reminder
    .post("/",insertReminderItemController)