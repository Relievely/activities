import {Request, Response} from "express";
import {RatingItem, ResponseObject} from "../../interfaces";
import {createRatingItemAdapter, getAllRatingsAdapter} from "../adapters/database";
import {responseError} from "../../helpers";
import {RunResult} from "better-sqlite3";

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