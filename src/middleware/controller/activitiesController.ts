import {Request, Response} from "express";
import {ActivityItem, ResponseObject} from "../../interfaces";
import {responseError} from "../../helpers";
import {RunResult} from "better-sqlite3";
import {
    addActivityAdapter,
    getAllActivitiesAdapter, getCategoryActivityAdapter, getLatestActivityAdapter, getPreviousActivitiesAdapter,
} from "../adapters/activity";

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
export const getLatestActivityController = (req: Request, res: Response<ResponseObject<ActivityItem>>) => {
    getLatestActivityAdapter(req)
        .then((response: ResponseObject<ActivityItem>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}

export const getCategoryActivityController = (req: Request, res: Response<ResponseObject<ActivityItem[]>>) => {
    getCategoryActivityAdapter(req)
        .then((response: ResponseObject<ActivityItem[]>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}

export const getPreviousActivitiesController = (req: Request, res: Response<ResponseObject<ActivityItem[]>>) => {
    getPreviousActivitiesAdapter(req)
        .then((response: ResponseObject<ActivityItem[]>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}