import supertest, {Response} from "supertest";
import {app} from '../app';

import {describe, it, expect} from '@jest/globals';
import {ResponseObject} from "../interfaces";
import {RunResult} from "better-sqlite3";

describe("Creation routes", () => {
    const requestWithSuperTest = supertest(app);

    it("should return a 200 response", async () => {
        await requestWithSuperTest
            .get("/create")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                const changes = (response.body as ResponseObject<RunResult>).data.value.changes;
                expect(changes).toBeGreaterThan(0);
                expect(changes).toBeLessThanOrEqual(4);
            });
    });

    it("should return a 200 response", async () => {
        await requestWithSuperTest
            .get("/fill")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                const changes = (response.body as ResponseObject<RunResult>).data.value.changes;
                expect(changes).toBeGreaterThan(0);
                expect(changes).toBeLessThanOrEqual(1);
            });
    });

    it("should return a 200 response", async () => {
        await requestWithSuperTest
            .get("/all")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
            });
    });
});

