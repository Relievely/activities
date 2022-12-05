import {describe, expect, it, beforeAll} from "@jest/globals";
import supertest, {Response} from "supertest";
import {app} from "../app";
import {ResponseObject} from "../interfaces";
import {databaseInit} from "./jestPresets";
import {RunResult} from "better-sqlite3";

const requestWithSuperTest = supertest(app);

beforeAll(async () => {
    await databaseInit();
    await requestWithSuperTest
        .put("/history")
        .send({activityId: 1, timeStart: 3453455345, timeEnd: 3453455350})
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response: Response) => {
            expect(response).toBeDefined();
            const body = response.body as ResponseObject<RunResult>;
            expect(body).toBeDefined();
        });
});
describe("Activities routes", () => {
    it("should return latest activity item that was logged", async () => {
        await requestWithSuperTest
            .get("/activity/latest")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                const body = response.body as ResponseObject<RunResult>;
                expect(body).toBeDefined();
                const length = body.data.length;
                expect(length).toBe(1);
            });
    })

    it("should return Previous activities items", async () => {
        await requestWithSuperTest
            .get("/activity/previous")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                const body = response.body as ResponseObject<RunResult[]>;
                expect(body).toBeDefined();
                const length = body.data.length;
                expect(length).toBeGreaterThanOrEqual(0);
            });
    });
});