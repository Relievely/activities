import {Request, Response} from "express";
import {ResponseObject} from "../../interfaces";
import {createTablesAdapter, fillTablesAdapter} from "../adapters/database";
import {RunResult} from "better-sqlite3";

export const createTablesController = async (req: Request, res: Response<ResponseObject<RunResult[]>>) => {
    const respObj = await createTablesAdapter(req);
    console.log("resp: ", respObj);
    res.status(200).json(respObj);
}

export const fillTablesController = async (req: Request, res: Response<ResponseObject<RunResult[]>>) => {
    const respObj = await fillTablesAdapter(req);
    console.log("resp: ", respObj);
    res.status(200).json(respObj);
}
