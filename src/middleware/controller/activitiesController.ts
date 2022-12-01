import {Request, Response} from "express";
import {ActivityItem, ResponseObject} from "../../interfaces";
import {getAllActivitiesAdapter, addActivityAdapter} from "../adapters/database";
import {responseError} from "../../helpers";

export const getAllActivitiesController = async (req: Request, res: Response<ResponseObject<ActivityItem[]>>) => {
    getAllActivitiesAdapter(req)
        .then((response: ResponseObject<ActivityItem[]>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}


export const addActivityController = async (name: string, category: string, res: Response<ResponseObject>) =>{
    const respObj = await addActivityAdapter(name, category);
    console.log("resp: ", respObj);
    res.status(200).json(respObj);
  }