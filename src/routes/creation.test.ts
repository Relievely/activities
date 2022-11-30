import supertest, {Response} from "supertest";
import {app} from '../app';

import {describe, afterAll, it, expect} from '@jest/globals';
import * as fs from "fs";

describe("Creation routes", () => {
    const requestWithSuperTest = supertest(app);

    it("should return a 200 response", async () => {
        await requestWithSuperTest
            .get("/create")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
            });
    });

    it("should return a 200 response", async () => {
        await requestWithSuperTest
            .get("/fill")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
            });
    });

    it("should return a 200 response", async () => {
        await requestWithSuperTest
            .get("/all")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                expect(response.body.body.length).toBeGreaterThan(0);
            });
    });
});

