import supertest, {Response} from "supertest";
import {app} from "../app";
import {beforeAll, describe, expect, it} from "@jest/globals";
import {databaseInit} from "./jestPresets";


beforeAll(() => databaseInit());

describe("Log routes", () => {
    const requestWithSuperTest = supertest(app);

    it("should create new reminder item", async () => {
        await requestWithSuperTest
            .post("/reminder")
            .send({ name: "football", triggerTime: 3453455345, activityID: 1})
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
            });
    })
});