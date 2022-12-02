import {Request} from "express";

import {ResponseObject} from "../../interfaces";

import Database, {Database as DatabaseType, RunResult, Statement} from "better-sqlite3";
import {emptyResultResponse, responseObjectItems, serviceDB} from "../../helpers";

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

        const createLogTable: Statement = serviceDB.prepare(`CREATE TABLE IF NOT EXISTS log
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
                                                    state INTEGER NOT NULL,
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

        const fillActivityTable = db.prepare(`INSERT OR IGNORE INTO activity (name, category)
                                              VALUES ('Breath', 'Guided'),
                                                     ('Walking', 'Non-Guided'),
                                                     ('Cooking', 'Non-Guided')`);

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

