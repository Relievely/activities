import {Request} from "express";
import {HistoryItem, ResponseObject} from "../../interfaces";
import {RunResult, Statement} from "better-sqlite3";
import {
    emptyResultResponse,
    emptyStatementResponse, insufficientParametersError,
    parametersIncluded,
    responseObjectItem,
    serviceDB
} from "../../helpers";

export const createHistoryItemAdapter = async (req: Request): Promise<ResponseObject<RunResult>> => {
    return new Promise<ResponseObject<RunResult>>((resolve, reject) => {

        const item: HistoryItem = req.body as HistoryItem;

        const activityId: number = Number(item.activityId);
        const timeStart: number = Number(item.timeStart);
        const timeEnd: number = Number(item.timeEnd);

        const stmt: Statement<[number, number, number]> = serviceDB.prepare(`INSERT INTO history (activityId, timeStart, timeEnd) VALUES (?, ?, ?)`);

        if (!stmt) {
            reject(emptyStatementResponse);
        }

        const result: RunResult = stmt.run(activityId, timeStart, timeEnd);
        if (result) {
            resolve(responseObjectItem<RunResult>(req, result))
        } else {
            reject(emptyResultResponse);
        }
    });
}

export const deleteHistoryItemAdapter = async (req: Request): Promise<ResponseObject<RunResult>> => {
    return new Promise<ResponseObject<RunResult>>((resolve, reject) => {
        const stmt = serviceDB.prepare<string>(`DELETE FROM history WHERE id = ?`);
        if (!stmt) {
            reject(emptyStatementResponse);
        }
        if (!parametersIncluded<string>(req, "id")) {
            reject(insufficientParametersError)
        }
        const result: RunResult = stmt.run(req.params.id);
        if (result) {
            resolve(responseObjectItem<RunResult>(req, result))
        } else {
            reject(emptyResultResponse)
        }
    });
}