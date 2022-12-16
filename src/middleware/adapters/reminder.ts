import {Request} from "express";
import {ActivityItem, ReminderItem, ResponseObject} from "../../interfaces";
import {RunResult, Statement} from "better-sqlite3";
import {
    emptyResultResponse,
    emptyStatementResponse,
    responseObjectItem,
    responseObjectItems,
    serviceDB
} from "../../helpers";

export const getAllReminderAdapter = async (req: Request): Promise<ResponseObject<ReminderItem[]>> => {
    return new Promise<ResponseObject<ReminderItem[]>>((resolve, reject) => {
        const stmt: Statement = serviceDB.prepare(`SELECT * FROM reminder`);


        const results: ReminderItem[] = stmt.all() as ReminderItem[];

        if (!stmt) {
            reject(emptyStatementResponse)
        }
        if (results) {
            resolve(responseObjectItems<ReminderItem>(req, results));
        } else {
            reject(emptyResultResponse)
        }
    });
}

export const getReminderItemAdapter = async (req: Request): Promise<ResponseObject<ReminderItem>> => {
    return new Promise<ResponseObject<ReminderItem>>((resolve, reject) => {

        const stmt: Statement = serviceDB.prepare(`   SELECT *
                                                            FROM reminder
                                                            WHERE id = ?`);

        if (!stmt) {
            reject(emptyStatementResponse)
        }

        const result: ReminderItem = stmt.get(req.params.id) as ReminderItem;
        if (result) {
            resolve(responseObjectItem<ReminderItem>(req, result));
        } else {
            reject(emptyResultResponse)
        }
    });
}

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

export const updateReminderItemTriggerAdapter = async (req: Request): Promise<ResponseObject<RunResult>> => {
    return new Promise<ResponseObject<RunResult>>((resolve, reject) => {
        const stmt = serviceDB.prepare<[number, number]>(`UPDATE reminder SET triggerTime = ? WHERE id = ?`);
        if (!stmt) {
            reject(emptyStatementResponse);
        }

        const item: ReminderItem = req.body as ReminderItem;

        const triggerTime = item.triggerTime;
        const id = item.id

        const result: RunResult = stmt.run(triggerTime, id);
        if (!stmt) {
            reject(emptyStatementResponse);
        }
        if (result) {
            resolve(responseObjectItem<RunResult>(req, result))
        } else {
            reject(emptyResultResponse)
        }
    });
}

export const updateReminderItemNameAdapter = async (req: Request): Promise<ResponseObject<RunResult>> => {
    return new Promise<ResponseObject<RunResult>>((resolve, reject) => {
        const stmt = serviceDB.prepare<[string, number]>(`UPDATE reminder SET name = ? WHERE id = ?`);


        const item: ReminderItem = req.body as ReminderItem;

        const name = item.name;
        const id = item.id

        const result: RunResult = stmt.run(name, id);
        if (!stmt) {
            reject(emptyStatementResponse);
        }
        if (result) {
            resolve(responseObjectItem<RunResult>(req, result))
        } else {
            reject(emptyResultResponse)
        }
    });
}

