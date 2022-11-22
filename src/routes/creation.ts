import {Router} from "express";
import {fillTablesController, initTablesController} from "../middleware/controller/tableController";

export const creation = Router();

creation
    .all("/create", initTablesController)
    .all("/fill", fillTablesController);