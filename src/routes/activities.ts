import bodyParser from "body-parser";
import {Router} from "express";
import {addActivityController} from "../middleware/controller/activitiesController";


export const activities = Router();

activities.use(bodyParser.urlencoded({extended: true}));
activities.use(bodyParser.json());

activities.post("/add", (req, res) => { void addActivityController(req.body.name, req.body.category, res)});