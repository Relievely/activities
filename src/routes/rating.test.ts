import {describe, it, expect, beforeAll} from '@jest/globals';
import {RunResult} from 'better-sqlite3';
import supertest, {Response} from 'supertest';
import {app} from '../app';
import {ResponseObject} from '../interfaces';
import {databaseInit} from "./jestPresets";

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

describe("should handle items", () => {
    let newID: number | bigint = 0;

    it("should create new note item", async () => {
        await requestWithSuperTest
            .post("/rating")
            .send({historyId: 1, state: 1})
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect((response.body as ResponseObject<RunResult>).data.value.changes).toBe(1);
                newID = (response.body as ResponseObject<RunResult>).data.value.lastInsertRowid;
            })
    })

    it("should return all rating items", async () => {
        await requestWithSuperTest
            .get("/rating")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                const body = response.body as ResponseObject<RunResult[]>;
                expect(body).toBeDefined();
                expect(body.data.length).toBeGreaterThanOrEqual(0);
            });
    });
});
