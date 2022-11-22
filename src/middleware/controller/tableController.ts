import {Request, Response} from "express";
import {ResponseObject} from "../../interfaces";
import {createTablesAdapter} from "../adapters/database";

export const initTablesController = async (req: Request, res: Response<ResponseObject>) => {
    const respObj = await createTablesAdapter(req);
    console.log("resp: ", respObj);
    res.status(200).json(respObj);
}
