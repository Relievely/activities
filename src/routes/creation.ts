import {Router} from "express";
import {initTablesController} from "../middleware/controller/tableController";

export const creation = Router();

creation
    .all("/create", initTablesController);