import {Request} from "express";
import {ReminderItem, ResponseObject} from "../../interfaces";
import {RunResult, Statement} from "better-sqlite3";
import {emptyResultResponse, emptyStatementResponse, responseObjectItem, serviceDB} from "../../helpers";


export const insertReminderItemAdapter = async (req: Request): Promise<ResponseObject<RunResult>> => {
    return new Promise<ResponseObject<RunResult>>((resolve, reject) => {

        const item: ReminderItem = req.body as ReminderItem;

        const name: string = item.name;
        const triggerTime: number = item.triggerTime;
        const activityID: number = item.activityID;
        const stmt: Statement<[string, number, number]> = serviceDB.prepare(`INSERT INTO reminder (name, triggerTime, activityID) VALUES (?, ?,?)`);

        if (!stmt) {
            reject(emptyStatementResponse);
        }

        const result: RunResult = stmt.run(name, triggerTime, activityID);
        if (result) {
            resolve(responseObjectItem<RunResult>(req, result))
        } else {
            reject(emptyResultResponse);
        }
    });
}