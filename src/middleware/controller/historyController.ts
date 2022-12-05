import {Request, Response} from "express";
import {ResponseObject} from "../../interfaces";
import {RunResult} from "better-sqlite3";
import {responseError} from "../../helpers";
import {createHistoryItemAdapter, deleteHistoryItemAdapter} from "../adapters/history";

export const insertHistoryItemController = (req: Request, res: Response<ResponseObject<RunResult>>): void => {
    createHistoryItemAdapter(req)
        .then((response: ResponseObject<RunResult>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}

export const deleteHistoryItemController = (req: Request, res: Response<ResponseObject<RunResult>>): void => {
    deleteHistoryItemAdapter(req)
        .then((response: ResponseObject<RunResult>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}