import {Request, Response} from "express";
import {ResponseObject} from "../../interfaces";
import {getAllActivitiesAdapter, addActivityAdapter} from "../adapters/database";

export const getAllActivitiesController = async (req: Request, res: Response<ResponseObject>) => {
    const respObj = await getAllActivitiesAdapter(req);
    console.log("resp: ", respObj);
    res.status(200).json(respObj);
}


export const addActivityController = async (name: string, category: string, res: Response<ResponseObject>) =>{
    const respObj = await addActivityAdapter(name, category);
    console.log("resp: ", respObj);
    res.status(200).json(respObj);
  }