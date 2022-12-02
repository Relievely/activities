import { Router } from "express";
import {deleteHistoryItemController, insertHistoryItemController} from "../middleware/controller/historyController";

export const history = Router();

history
    .put("/", insertHistoryItemController)
    .delete("/",deleteHistoryItemController)