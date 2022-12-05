import {Router} from "express";
import {getAllRatingsController, insertRatingItemController} from "../middleware/controller/ratingController";

export const rating = Router();

rating
    .get("/", getAllRatingsController)
    .post("/", insertRatingItemController)