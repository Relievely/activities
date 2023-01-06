import {Request, Response} from "express";
import {ResponseObject} from "../../interfaces";
import {createTablesAdapter, fillTablesAdapter} from "../adapters/database";
import {RunResult} from "better-sqlite3";
import {responseError} from "../../helpers";

export const createTablesController = (req: Request, res: Response<ResponseObject<RunResult[]>>) => {
    createTablesAdapter(req)
        .then((response: ResponseObject<RunResult[]>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}

export const fillTablesController = (req: Request, res: Response<ResponseObject<RunResult[]>>) => {
    fillTablesAdapter(req)
        .then((response: ResponseObject<RunResult[]>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}