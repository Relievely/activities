import {Request} from "express";
import {RatingItem, ResponseObject} from "../../interfaces";
import {RunResult, Statement} from "better-sqlite3";
import {emptyResultResponse, emptyStatementResponse, responseObjectItem, responseObjectItems, serviceDB} from "../../helpers";

export const getAllRatingsAdapter = async (req: Request): Promise<ResponseObject<RatingItem[]>> => {
 return new Promise<ResponseObject<RatingItem[]>>((resolve, reject) => {
  const stmt: Statement = serviceDB.prepare(`SELECT *
                                             FROM rating`);
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

  const historyId: number = item.historyId;
  const state: boolean = item.state;
  const stmt: Statement<[number, boolean]> = serviceDB.prepare(`INSERT INTO rating (historyId, state)
                                                                VALUES (?, ?)`);

  if (!stmt) {
   reject(emptyStatementResponse);
  }

  const result: RunResult = stmt.run(historyId, state);
  if (result) {
   resolve(responseObjectItem<RunResult>(req, result))
  } else {
   reject(emptyResultResponse);
  }
 });
}