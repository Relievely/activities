import { RunResult } from "better-sqlite3";
import { Request, Response } from "express";
import { responseError } from "../../helpers";
import { RatingItem, ResponseObject } from "../../interfaces";
import { createRatingItemAdapter, getAllRatingsAdapter } from "../adapters/database";

export const getAllRatingsController = (req: Request, res: Response<ResponseObject<RatingItem[]>>) => {
    getAllRatingsAdapter(req)
        .then((response: ResponseObject<RatingItem[]>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}

export const insertRatingItemController = (req: Request, res: Response<ResponseObject<RunResult>>): void => {
    createRatingItemAdapter(req)
        .then((response: ResponseObject<RunResult>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}