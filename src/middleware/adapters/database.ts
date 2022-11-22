import {ResponseObject} from "../../interfaces";
import {Request} from "express";
import Database, {Database as DatabaseType, RunResult, Transaction} from "better-sqlite3";

export const createTablesAdapter = async (req: Request): Promise<ResponseObject> => {
    return new Promise<ResponseObject>((resolve, reject) => {

        const db: DatabaseType = new Database('./activities.db');

        const endResult: any[] = [];

        const createActivityTable = db.prepare(`CREATE TABLE IF NOT EXISTS activity
                    (
                        id         INTEGER not null
                            primary key autoincrement,
                        name       varchar not null,
                        categoryId INTEGER not null,
                        reminderId INTEGER not null
                    );`);

        db.transaction(() => {
            try {
                const result: RunResult = createActivityTable.run();
                console.log("result: ", result);
                endResult.push([result]);
            } catch(err) {
                reject(err);
            }
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
        } catch(err) {
            reject(err);
        }
    });
}