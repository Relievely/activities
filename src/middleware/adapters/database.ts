import {ResponseObject} from "../../interfaces";
import {Request} from "express";
import Database, {Database as DatabaseType, RunResult} from "better-sqlite3";

export const createTablesAdapter = async (req: Request): Promise<ResponseObject> => {
    return new Promise<ResponseObject>((resolve, reject) => {

        const db: DatabaseType = new Database('./activities.db');

        const endResult: RunResult[] = [];

        const createActivityTable = db.prepare(`CREATE TABLE IF NOT EXISTS activity
                                                (
                                                    id       INTEGER                                             NOT NULL
                                                        PRIMARY KEY AUTOINCREMENT,
                                                    name     TEXT                                                NOT NULL,
                                                    category TEXT CHECK ( category IN ('Guided', 'Non-Guided') ) NOT NULL
                                                );`);

        const createReminderTable = db.prepare(`CREATE TABLE IF NOT EXISTS reminder
                                                (
                                                    id   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                                                    name TEXT    NOT NULL,
                                                    activityId INTEGER NOT NULL
                                                )
        `)

        try {
            db.transaction(() => {
                const activityResult: RunResult = createActivityTable.run();
                endResult.push(activityResult);
                const reminderResult: RunResult = createReminderTable.run();
                endResult.push(reminderResult);
            })();

            db.close();

            resolve({
                query: "/create",
                params: req.params,
                sender: "",
                body: {
                    length: endResult?.length ?? 0,
                    data: endResult
                }
            })
        } catch (err) {
            reject(err);
        }

    })
}

export const fillTablesAdapter = async (req: Request): Promise<ResponseObject> => {
    return new Promise<ResponseObject>((resolve, reject) => {

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

            resolve({
                query: "/fill",
                params: req.params,
                sender: "",
                body: {
                    length: endResult?.length ?? 0,
                    data: endResult
                }
            })
        } catch (err) {
            reject(err);
        }

    })
}

export const getAllActivitiesAdapter = async (req: Request): Promise<ResponseObject> => {
    return new Promise<ResponseObject>((resolve, reject) => {

        const db: DatabaseType = new Database('./activities.db');

        const stmt = db.prepare(`SELECT * FROM activity`);

        try {
            const results: any[] = stmt.all();
            resolve({
                query: "/all",
                params: req.params,
                sender: "",
                body: {
                    length: results?.length ?? 0,
                    data: results
                }
            })
        } catch (err) {
            reject(err);
        }
    });
}