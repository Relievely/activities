import {describe, expect, it, beforeAll} from "@jest/globals";
import supertest, {Response} from "supertest";
import {app} from "../app";
import {RatingItem, ResponseObject} from "../interfaces";
import {RunResult} from "better-sqlite3";

describe("Activities routes", () => {
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
                    .then((fillResponse: Response) => {
                        expect(fillResponse).toBeDefined();
                        const fillLength = (response.body as ResponseObject<RunResult[]>).data.length;
                        expect(fillLength).toBeGreaterThanOrEqual(0);
                        expect(fillLength).toBeLessThanOrEqual(4);
                    });
            });
    });

    it("should return latest activity item that was logged", async () => {
        await requestWithSuperTest
            .put("/history")
            .send({activityId: 1, timeStart: 3453455345, timeEnd: 3453455350})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(async (response: Response) => {
                expect(response).toBeDefined();
                await requestWithSuperTest
                    .get("/activity/latest")
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .then((latestActivityResponse: Response) => {
                        expect(latestActivityResponse).toBeDefined();
                        expect((latestActivityResponse.body as ResponseObject<RatingItem>).body).toBeDefined();
                    });
            });
    })
});