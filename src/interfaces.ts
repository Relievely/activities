<<<<<<< Updated upstream
import {ParamsDictionary} from "express-serve-static-core";
import {RunResult} from "better-sqlite3";

export interface ResponseObject {
    query: string | any
    params: string[] | ParamsDictionary
    sender: string | number
    body: {
        length: number
        data: object | RunResult | RunResult[]
    },
=======
import {ParamsDictionary} from "express-serve-static-core";
import QueryString from "qs";
import {MediaType} from "express";

type ReqBody = any;

export interface ResponseObject<T> {
    url: string,
    route: any,
    query: QueryString.ParsedQs,
    params: ParamsDictionary,
    body: ReqBody,
    accepted: MediaType[],
    status?: string
    data?: {
        length: number
        value: T
    },
    error?: string
}

export interface ActivityItem {
    id?: number,
    name: string,
    description: string,
    category: string
}

export interface LogItem {
    id?: number,
    activityId: number,
    timeStart: number,
    timeEnd: number
}

export interface RatingItem {
    id?: number,
    logId: number,
    bool: number
>>>>>>> Stashed changes
}