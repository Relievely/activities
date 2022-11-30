import {Request, Response} from "express";
import {ActivityItem, ResponseObject} from "../../interfaces";
import {getAllActivitiesAdapter} from "../adapters/database";
import {responseError} from "../../helpers";

export const getAllActivitiesController = async (req: Request, res: Response<ResponseObject<ActivityItem[]>>) => {
    getAllActivitiesAdapter(req)
        .then((response: ResponseObject<ActivityItem[]>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}
