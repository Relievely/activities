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
    category: "Guided" | "Non-Guided"
}

export interface RatingItem {
    id?: number,
    historyId: number,
    state: boolean
}

export interface HistoryItem {
    id?: number,
    activityId: number,
    timeStart: number,
    timeEnd: number
}

export interface ReminderItem {
    id?: number,
    name: string,
    triggerTime: number,
    activityID: number
}