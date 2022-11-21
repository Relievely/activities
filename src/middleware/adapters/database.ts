import {ResponseObject} from "../../interfaces";
import {Request} from "express";

export const connectToDatabaseAdapter = async (req: Request): Promise<ResponseObject> => {
    return new Promise<ResponseObject>((resolve, reject) => {
        const sqlite3 = require('sqlite3').verbose();

        let db = new sqlite3.Database('./db/chinook.db', (err: Error | null) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            console.log('Connected to the in-memory SQlite database.');
        });

        db.close((err: Error | null) => {
            if (err) {
                console.error(err.message);
                reject(err);
            }
            console.log('Close the database connection.');
        });
        resolve({
            query: "/all",
            params: [],
            sender: "",
            body: {
                length: 1,
                data: {}
            }
        })
    });
}
