import {Request} from "express";

import {ResponseObject} from "../../interfaces";

import {RunResult, Statement} from "better-sqlite3";
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

        const fillActivityTable = serviceDB.prepare(`INSERT OR IGNORE INTO activity (name, category)
                                              VALUES ('Breath', 'Guided'),
                                                     ('Walking', 'Non-Guided'),
                                                     ('Cooking', 'Non-Guided')`);

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

