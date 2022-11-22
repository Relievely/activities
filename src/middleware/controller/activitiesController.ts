import {Request, Response} from "express";
import {ResponseObject} from "../../interfaces";
import {getAllActivitiesAdapter} from "../adapters/database";

export const getAllActivitiesController = async (req: Request, res: Response<ResponseObject>) => {
    const respObj = await getAllActivitiesAdapter(req);
    console.log("resp: ", respObj);
    res.status(200).json(respObj);
}
