import {describe, expect, it, beforeAll} from "@jest/globals";
import supertest, {Response} from "supertest";
import {app} from "../app";
import {ActivityItem, ResponseObject} from "../interfaces";
import {databaseInit} from "./jestPresets";

const requestWithSuperTest = supertest(app);

beforeAll(() => databaseInit());
describe("Activities routes", () => {
    it("should return latest activity item that was logged", async () => {
        await requestWithSuperTest
            .get("/activity/latest")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                expect((response.body as ResponseObject<ActivityItem>).body).toBeDefined();
            });
    })

    it("should return Previous activities items", async () => {
        await requestWithSuperTest
            .get("/activity/previous")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                expect((response.body as ResponseObject<ActivityItem[]>).body).toBeDefined();
            });
    });
});