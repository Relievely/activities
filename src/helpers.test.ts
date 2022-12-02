import {parametersIncluded, serviceDB} from "./helpers";
import {Request} from "express";

import {test, expect} from '@jest/globals';
import {ParamsDictionary} from "express-serve-static-core";

test("Instantiate userDB", () => {
    expect(serviceDB).toBeDefined();
});

test("Validate parameters", () => {
    const parameters: ParamsDictionary = {
        name: "Michael"
    };

    const mockRequest: Request = {
        params: parameters,
    } as Request;
    const response = parametersIncluded(mockRequest, "name");
    expect(response).toBeTruthy();
})