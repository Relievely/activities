import {beforeAll, describe, expect, it} from "@jest/globals";
import supertest, {Response} from "supertest";
import {app} from "../app";
import {ActivityItem, ResponseObject} from "../interfaces";
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
    let newLimit: number | bigint = 0
    it("should return latest activity item that was logged", async () => {
        newLimit = 1
        await requestWithSuperTest
            .get(`/activity/previous/${newLimit}`)
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
        newLimit = 3
        await requestWithSuperTest
            .get(`/activity/previous/${newLimit}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                const body = response.body as ResponseObject<RunResult[]>;
                expect(body).toBeDefined();
                const length = body.data.length;
                expect(length).toBeGreaterThanOrEqual(0);
                expect(length).toBeLessThanOrEqual(3);
            });
    });

    const newID: number | bigint = 1;

    it("should return activity item with id", async () => {
        expect(newID).toBeGreaterThan(0);
        await requestWithSuperTest
            .get(`/activity/${newID}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                expect((response.body as ResponseObject<ActivityItem>).data).toBeDefined();
                expect((response.body as ResponseObject<ActivityItem>).data.value).toBeDefined();
                expect((response.body as ResponseObject<ActivityItem>).data.value.id).toBe(newID);
            });
    });
});