import {beforeAll, describe, expect, it} from "@jest/globals";
import supertest, {Response} from "supertest";
import {app} from "../app";
import {databaseInit} from "./jestPresets";

beforeAll(() => databaseInit());

describe("Log routes", () => {
    const requestWithSuperTest = supertest(app);

    it("should create new history item", async () => {
        await requestWithSuperTest
            .put("/history")
            .send({activityId: 1, timeStart: 3453455345, timeEnd: 3453455350})
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
            });
    })
});