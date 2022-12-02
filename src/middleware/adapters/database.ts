import {ActivityItem, LogItem, ResponseObject} from "../../interfaces";
import {Request} from "express";
import Database, {Database as DatabaseType, RunResult, Statement} from "better-sqlite3";
import {
    emptyResultResponse,
    emptyStatementResponse,
    responseObjectItem,
    responseObjectItems,
    serviceDB
} from "../../helpers";

export const createTablesAdapter = async (req: Request): Promise<ResponseObject<RunResult[]>> => {
    return new Promise<ResponseObject<RunResult[]>>((resolve, reject) => {
        const endResult: RunResult[] = [];

        const createActivityTable: Statement = serviceDB.prepare(`CREATE TABLE IF NOT EXISTS activity
                                                (
                                                    id INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
                                                    name     TEXT       UNIQUE                                          NOT NULL,
                                                    category TEXT CHECK ( category IN ('Guided', 'Non-Guided') ) NOT NULL
                                                );`);

        const createReminderTable: Statement = serviceDB.prepare(`CREATE TABLE IF NOT EXISTS reminder
                                                (
                                                    id   INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
                                                    name TEXT    NOT NULL,
                                                    activityId INTEGER NOT NULL
                                                );`);

        const createLogTable: Statement = serviceDB.prepare(`CREATE TABLE IF NOT EXISTS history
                                                (
                                                    id   INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
                                                    activityId INTEGER NOT NULL,
                                                    timeStart INTEGER NOT NULL,
                                                    timeEnd INTEGER,
                                                    FOREIGN KEY(activityId) REFERENCES activity(id)
                                                );`);

        const createRatingTable: Statement = serviceDB.prepare(`CREATE TABLE IF NOT EXISTS rating
                                                (
                                                    id   INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
                                                    logId INTEGER NOT NULL,
                                                    bool INTEGER NOT NULL,
                                                    FOREIGN KEY(logId) REFERENCES log(id)
                                                );`);

        serviceDB.transaction(() => {
            const activityResult: RunResult = createActivityTable.run();
            if (activityResult) {
                endResult.push(activityResult);
            } else {
                reject(emptyResultResponse);
            }
            const reminderResult: RunResult = createReminderTable.run();
            if (reminderResult) {
                endResult.push(reminderResult);
            } else {
                reject(emptyResultResponse);
            }
            const logResult: RunResult = createLogTable.run();
            if (logResult) {
                endResult.push(logResult);
            } else {
                reject(emptyResultResponse);
            }
            const ratingTable: RunResult = createRatingTable.run();
            if (ratingTable) {
                endResult.push(ratingTable);
            } else {
                reject(emptyResultResponse);
            }
        })();

        resolve(responseObjectItems<RunResult>(req, endResult));

    })
}

export const fillTablesAdapter = async (req: Request): Promise<ResponseObject<RunResult[]>> => {
    return new Promise<ResponseObject<RunResult[]>>((resolve, reject) => {

        const db: DatabaseType = new Database('./activities.db');

        const endResult: RunResult[] = [];

        const fillActivityTable = db.prepare(`INSERT INTO activity (name, category)
                                              VALUES ('Breath', 'Guided'), ('Walking', 'Non-Guided'), ('Cooking', 'Non-Guided')`);

        try {
            db.transaction(() => {
                const activityResult: RunResult = fillActivityTable.run();
                endResult.push(activityResult);
            })();

            db.close();

            resolve(responseObjectItems<RunResult>(req, endResult));
        } catch (err) {
            reject(err);
        }

    })
}

export const getAllActivitiesAdapter = async (req: Request): Promise<ResponseObject<ActivityItem[]>> => {
    return new Promise<ResponseObject<ActivityItem[]>>((resolve, reject) => {
        const stmt: Statement = serviceDB.prepare(`SELECT * FROM activity`);
        if (!stmt) {
            reject(emptyStatementResponse)
        }

        const results: any[] = stmt.all();
        if (results) {
            resolve(responseObjectItems<ActivityItem>(req, results));
        } else {
            reject(emptyResultResponse)
        }
    });
}

export const getLatestActivityAdapter = async (req: Request): Promise<ResponseObject<ActivityItem>> => {
    return new Promise<ResponseObject<ActivityItem>>((resolve, reject) => {

         const stmt: Statement = serviceDB.prepare(`SELECT activity.*, history.activityId FROM activity JOIN history  ON activity.id = history.activityId`);

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