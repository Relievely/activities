import {describe, it, expect} from '@jest/globals';
import { RunResult } from 'better-sqlite3';
import supertest, {Response} from 'supertest';
import { app } from '../app';
import { RatingItem, ResponseObject } from '../interfaces';

describe("Rating routes", () => {
    const requestWithSuperTest = supertest(app);
    it("should return all rating items", async () => {
        await requestWithSuperTest
            .get("/rating")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                expect((response.body as ResponseObject<RatingItem>).body).toBeDefined();
            });
    });
});



describe("should handle item", () => {
    const requestWithSuperTest = supertest(app);

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
});
