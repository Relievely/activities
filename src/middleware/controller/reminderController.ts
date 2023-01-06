import {Request, Response} from "express";
import {ReminderItem, ResponseObject} from "../../interfaces";
import {RunResult} from "better-sqlite3";
import {responseError} from "../../helpers";
import {
 getAllReminderAdapter,
 getReminderItemAdapter,
 insertReminderItemAdapter,
 updateReminderItemNameAdapter,
 updateReminderItemTriggerAdapter
} from "../adapters/reminder";

export const insertReminderItemController = (req: Request, res: Response<ResponseObject<RunResult>>): void => {
 insertReminderItemAdapter(req)
  .then((response: ResponseObject<RunResult>) => res.status(200).json(response))
  .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}

export const updateReminderItemTimeController = (req: Request, res: Response<ResponseObject<RunResult>>): void => {
 updateReminderItemTriggerAdapter(req)
  .then((response: ResponseObject<RunResult>) => res.status(200).json(response))
  .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}

export const updateReminderItemNameController = (req: Request, res: Response<ResponseObject<RunResult>>): void => {
 updateReminderItemNameAdapter(req)
  .then((response: ResponseObject<RunResult>) => res.status(200).json(response))
  .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}

export const getAllReminderController = (req: Request, res: Response<ResponseObject<ReminderItem[]>>) => {
 getAllReminderAdapter(req)
  .then((response: ResponseObject<ReminderItem[]>) => res.status(200).json(response))
  .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}

export const getReminderItemController = (req: Request, res: Response<ResponseObject<ReminderItem>>) => {
 getReminderItemAdapter(req)
  .then((response: ResponseObject<ReminderItem>) => res.status(200).json(response))
  .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}