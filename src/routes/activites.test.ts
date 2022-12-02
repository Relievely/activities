import {describe, expect, it} from "@jest/globals";
import supertest, {Response} from "supertest";
import {app} from "../app";
import {RatingItem, ResponseObject} from "../interfaces";

describe("Activities routes", () => {
    const requestWithSuperTest = supertest(app);
    it("should return the newest activity from log item", async () => {
        await requestWithSuperTest
            .get("/activity/recent")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                expect((response.body as ResponseObject<RatingItem>).body).toBeDefined();
            });
    });
});