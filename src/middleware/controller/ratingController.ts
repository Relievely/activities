import {Request, Response} from "express";
import {ActivityItem, ResponseObject} from "../../interfaces";
import {getLatestActivityAdapter} from "../adapters/database";
import {responseError} from "../../helpers";


export const getLatestActivityController = async (req: Request, res: Response<ResponseObject<ActivityItem>>) => {
    getLatestActivityAdapter(req)
        .then((response: ResponseObject<ActivityItem>) =>res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}
