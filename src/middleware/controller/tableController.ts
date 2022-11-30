import {Request, Response} from "express";
import {ResponseObject} from "../../interfaces";
import {createTablesAdapter, fillTablesAdapter} from "../adapters/database";

export const createTablesController = async (req: Request, res: Response<ResponseObject>) => {
    const respObj = await createTablesAdapter(req);
    console.log("resp: ", respObj);
    res.status(200).json(respObj);
}

export const fillTablesController = async (req: Request, res: Response<ResponseObject>) => {
    const respObj = await fillTablesAdapter(req);
    console.log("resp: ", respObj);
    res.status(200).json(respObj);
}
