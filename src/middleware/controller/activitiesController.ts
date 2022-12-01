import {Request, Response} from "express";
import {ActivityItem, ResponseObject} from "../../interfaces";
import {getAllActivitiesAdapter, addActivityAdapter} from "../adapters/database";
import {responseError} from "../../helpers";
import {RunResult} from "better-sqlite3";

export const getAllActivitiesController = (req: Request, res: Response<ResponseObject<ActivityItem[]>>) => {
    getAllActivitiesAdapter(req)
        .then((response: ResponseObject<ActivityItem[]>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}

export const addActivityController = (req: Request, res: Response<ResponseObject<RunResult>>) => {
    addActivityAdapter(req)
        .then((response: ResponseObject<RunResult>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
  }