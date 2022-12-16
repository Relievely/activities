import {Request, Response} from "express";
import {ResponseObject} from "../../interfaces";
import {RunResult} from "better-sqlite3";
import {responseError} from "../../helpers";
import {insertReminderItemAdapter} from "../adapters/reminder";

export const insertReminderItemController = (req: Request, res: Response<ResponseObject<RunResult>>): void => {
    insertReminderItemAdapter(req)
        .then((response: ResponseObject<RunResult>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}