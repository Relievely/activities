import {beforeAll, describe, expect, it} from "@jest/globals";
import supertest, {Response} from "supertest";
import {app} from "../app";
import {ResponseObject} from "../interfaces";
import {RunResult} from "better-sqlite3";

describe("Log routes", () => {
    const requestWithSuperTest = supertest(app);

    beforeAll(async () => {
        await requestWithSuperTest
            .get("/create")
            .expect(200)
            .expect('Content-Type', /json/)
            .then(async (response: Response) => {
                expect(response).toBeDefined();
                const length = (response.body as ResponseObject<RunResult[]>).data.length;
                expect(length).toBeGreaterThanOrEqual(0);
                expect(length).toBeLessThanOrEqual(4);

                await requestWithSuperTest
                    .get("/fill")
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .then(async (response: Response) => {
                        expect(response).toBeDefined();
                        const fillLength = (response.body as ResponseObject<RunResult[]>).data.length;
                        expect(fillLength).toBeGreaterThanOrEqual(0);
                        expect(fillLength).toBeLessThanOrEqual(1);
                    });
            });
    });

    it("should create new history item", async() => {
        await requestWithSuperTest
            .put("/history")
            .send({activityId: 1, timeStart: 3453455345, timeEnd: 3453455350})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(async (response: Response) => {
                expect(response).toBeDefined();
            });
    })
});