import { Router } from "express";
import { getAllRatingsController, insertRatingItemController } from "../middleware/controller/RatingController";

export const rating = Router();

rating
    .get("/", getAllRatingsController)
    .post("/",insertRatingItemController)