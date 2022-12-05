import {Request} from "express";
import {ActivityItem, ResponseObject} from "../../interfaces";
import {RunResult, Statement} from "better-sqlite3";
import {
    emptyResultResponse,
    emptyStatementResponse,
    responseObjectItem,
    responseObjectItems,
    serviceDB
} from "../../helpers";

export const getAllActivitiesAdapter = async (req: Request): Promise<ResponseObject<ActivityItem[]>> => {
    return new Promise<ResponseObject<ActivityItem[]>>((resolve, reject) => {
        const stmt: Statement = serviceDB.prepare(`SELECT * FROM activity`);
        if (!stmt) {
            reject(emptyStatementResponse)
        }

        const results: ActivityItem[] = stmt.all() as ActivityItem[];
        if (results) {
            resolve(responseObjectItems<ActivityItem>(req, results));
        } else {
            reject(emptyResultResponse)
        }
    });
}
export const addActivityAdapter = async (req: Request): Promise<ResponseObject<RunResult>> => {
    return new Promise<ResponseObject<RunResult>>((resolve, reject) => {
        const item: ActivityItem = req.body as ActivityItem;

        const stmt: Statement<[string, string]> = serviceDB.prepare(`INSERT INTO activity (name, category) VALUES (?, ?)`);

        if (!stmt) {
            reject(emptyStatementResponse);
        }

        const activityResult: RunResult = stmt.run(item.name, item.category);
        if (activityResult) {
            resolve(responseObjectItem<RunResult>(req, activityResult));
        } else {
            reject(emptyResultResponse)
        }
    });
}
export const getLatestActivityAdapter = async (req: Request): Promise<ResponseObject<ActivityItem>> => {
    return new Promise<ResponseObject<ActivityItem>>((resolve, reject) => {

        const stmt: Statement = serviceDB.prepare(`SELECT activity.*
                                                   FROM activity
                                                            JOIN history ON activity.id = history.activityId`);

        if (!stmt) {
            reject(emptyStatementResponse)
        }

        const result: ActivityItem = stmt.get() as ActivityItem;
        if (result) {
            resolve(responseObjectItem<ActivityItem>(req, result));
        } else {
            reject(emptyResultResponse)
        }
    });
}