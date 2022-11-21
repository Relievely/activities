import {Request, Response} from "express";
import {ResponseObject} from "../../interfaces";
import {connectToDatabaseAdapter} from "../adapters/database";

export const getAllActivitiesController = async (req: Request, res: Response<ResponseObject>) => {
    res.status(200).json(await connectToDatabaseAdapter(req));
}
