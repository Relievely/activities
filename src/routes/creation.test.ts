import supertest, {Response} from "supertest";
import {app} from '../app';

import {describe, expect, it} from '@jest/globals';
import {ResponseObject} from "../interfaces";
import {RunResult} from "better-sqlite3";

describe("Creation routes", () => {
    const requestWithSuperTest = supertest(app);

    it("should create tables with data", async () => {
        await requestWithSuperTest
            .put("/create")
            .expect(200)
            .expect('Content-Type', /json/)
            .then(async (response: Response) => {
                expect(response).toBeDefined();
                const length = (response.body as ResponseObject<RunResult[]>).data.length;
                expect(length).toBeGreaterThanOrEqual(0);
                expect(length).toBeLessThanOrEqual(4);

                await requestWithSuperTest
                    .put("/fill")
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
});

