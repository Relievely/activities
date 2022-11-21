import {ParamsDictionary} from "express-serve-static-core";

export interface ResponseObject {
    query: string
    params: string[] | ParamsDictionary
    sender: string | number
    body: {
        length: number
        data: object
    },
}