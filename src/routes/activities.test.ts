import {describe, expect, it, beforeAll} from "@jest/globals";
import supertest, {Response} from "supertest";
import {app} from "../app";
import {ActivityItem, ResponseObject} from "../interfaces";
import {RunResult} from "better-sqlite3";



beforeAll(async () => {
    const requestWithSuperTest = supertest(app);

    await requestWithSuperTest
        .get("/create")
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response: Response) => {
            expect(response).toBeDefined();
            const length = (response.body as ResponseObject<RunResult[]>).data.length;
            expect(length).toBeGreaterThanOrEqual(0);
            expect(length).toBeLessThanOrEqual(4);

        });
});
describe("Activities routes", () => {

    const requestWithSuperTest = supertest(app);


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