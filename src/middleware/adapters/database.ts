import {Request} from "express";

import {ActivityItem, RatingItem, ResponseObject} from "../../interfaces";

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
                                                    category TEXT CHECK ( category IN ('Guided', 'Non-Guided') ) NOT NULL,
                                                    description TEXT NOT NULL
                                                );`);

        const createReminderTable: Statement = serviceDB.prepare(`CREATE TABLE IF NOT EXISTS reminder
                                                (
                                                    id   INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
                                                    name TEXT    NOT NULL,
                                                    activityId INTEGER NOT NULL
                                                );`);


        const createHistoryTable: Statement = serviceDB.prepare(`CREATE TABLE IF NOT EXISTS history
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
                                                    historyId INTEGER NOT NULL,
                                                    state INTEGER NOT NULL,
                                                    FOREIGN KEY(historyId) REFERENCES history(id)
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

            const historyTableResult: RunResult = createHistoryTable.run();
            if (historyTableResult) {
                endResult.push(historyTableResult);
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

        const endResult: RunResult[] = [];

        const fillActivityTable = serviceDB.prepare(`INSERT INTO activity (name, category, description)
                                              VALUES ('Breath', 'Guided', 'Take some deep breaths to calm yourself down'), ('Walking', 'Non-Guided', 'take a walk and distract yourself from your stress'), ('Cooking', 'Non-Guided', 'make yourself a healthy meal and care for yourself')`);

        try {
            serviceDB.transaction(() => {
                const activityResult: RunResult = fillActivityTable.run();
                endResult.push(activityResult);
            })();

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

export const getAllRatingsAdapter = async (req: Request): Promise<ResponseObject<RatingItem[]>> => {
    return new Promise<ResponseObject<RatingItem[]>>((resolve, reject) => {
        const stmt: Statement = serviceDB.prepare(`SELECT * FROM rating`);
        if (!stmt) {
            reject(emptyStatementResponse)
        }

        const results: RatingItem[] = stmt.all() as RatingItem[];
        if (results) {
            resolve(responseObjectItems<RatingItem>(req, results));
        } else {
            reject(emptyResultResponse)
        }
    });
}

export const createRatingItemAdapter = async (req: Request): Promise<ResponseObject<RunResult>> => {
    return new Promise<ResponseObject<RunResult>>((resolve, reject) => {

        const item: RatingItem = req.body as RatingItem;

        const logId: number = item.logId;
        const state: boolean = item.state;
        const stmt: Statement<[number, boolean]> = serviceDB.prepare(`INSERT INTO rating (logId, state) VALUES (?, ?)`);

        if (!stmt) {
            reject(emptyStatementResponse);
        }

        const result: RunResult = stmt.run(logId, state);
        if (result) {
            resolve(responseObjectItem<RunResult>(req, result))
        } else {
            reject(emptyResultResponse);
        }
    });
}
