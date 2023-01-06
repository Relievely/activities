import {Router} from "express";
import {createTablesController, fillTablesController} from "../middleware/controller/tableController";

export const creation = Router();

creation
    .put("/create", createTablesController)
    .put("/fill", fillTablesController);