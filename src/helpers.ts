import {Request} from "express";
import {ResponseObject} from "./interfaces";

export const ParameterErrorResponse = (req: Request): ResponseObject => ({
    query: req.url,
    params: req.params,
    sender: "Service",
    body: {
        length: 4,
        data: {"error": "Didn't provided necessary parameters"}
    },
})