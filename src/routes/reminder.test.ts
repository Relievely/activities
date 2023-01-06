import supertest, {Response} from "supertest";
import {app} from "../app";
import {beforeAll, describe, expect, it} from "@jest/globals";
import {databaseInit} from "./jestPresets";
import {ActivityItem, ReminderItem, ResponseObject} from "../interfaces";
import {RunResult} from "better-sqlite3";


beforeAll(() => databaseInit());


describe("should handle item", ()=>{
    const requestWithSuperTest = supertest(app);
    it("should create new reminder item", async () => {
        await requestWithSuperTest
            .post("/reminder")
            .send({ name: "football", triggerTime: 3453455345, activityID: 1})
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
            });
    });
    const newID: number | bigint = 1;
    it(`should update name of item`, async () => {
        await requestWithSuperTest
            .patch(`/reminder/name`)
            .send({name: "Basketball", id: newID})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(async (response: Response) => {
                expect((response.body as ResponseObject<RunResult>).data.value.changes).toBe(1);
                await requestWithSuperTest
                    .get(`/reminder/${newID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .then((getResponse: Response) => {
                        expect((getResponse.body as ResponseObject<ReminderItem>).data.value.name).toBe("Basketball");
                    })
            })
    });

    it(`should update triggerTime of item`, async () => {
        await requestWithSuperTest
            .patch(`/reminder/time`)
            .send({triggerTime: 358954892, id: newID})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(async (response: Response) => {
                expect((response.body as ResponseObject<RunResult>).data.value.changes).toBe(1);
                await requestWithSuperTest
                    .get(`/reminder/${newID}`)
                    .expect(200)
                    .expect('Content-Type', /json/)
                    .then((getResponse: Response) => {
                        expect((getResponse.body as ResponseObject<ReminderItem>).data.value.triggerTime).toBe(358954892);
                    })
            })
    });
})
describe("reminder routes", () => {
    const requestWithSuperTest = supertest(app);

    it("should return all Reminder items", async () => {
        await requestWithSuperTest
            .get("/reminder")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                const body = response.body as ResponseObject<RunResult[]>;
                expect(body).toBeDefined();
                expect((response.body as ResponseObject<ReminderItem>).data.length).toBeGreaterThanOrEqual(0);
            });
    });
    const newID: number | bigint = 1;
    it("should return reminder item with id", async () => {
        expect(newID).toBeGreaterThan(0);
        await requestWithSuperTest
            .get(`/reminder/${newID}`)
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