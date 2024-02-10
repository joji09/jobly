const db = require("../db");
const app = require("../app");

const request = require("supertest");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    adminToken,
    u1Token,
    testJobs,
  } = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /jobs */
 
describe("POST /jobs", function () {

    test("post jobs by admin", async function () {
        const resp = await request(app).post(`/jobs`).send({
            companyHandle: "c1",
            title: "jobtest",
            salary: 10,
            equity: "0.2",
        }).set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            job: {
                id: expect.any(Number),
                title: "jobtest",
                salary: 10,
                equity: "0.2",
                companyHandle: "c1",
            },
        });
    });

    test("unauthorized for user", async function () {
        const resp = await request(app).post(`/jobs`).send({
            companyHandle: "c1",
            title: "new-job",
            salary: 10,
            equity: "0.2",
        }).set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(401);
    });
});

/************************************** GET /jobs */

describe("GET /jobs", function () {
    test("everyone can see jobs", async function () {
        const resp = await request(app).get(`/jobs`);
        expect(resp.body).toEqual({
            jobs: [
                {
                    id: expect.any(Number),
                    title: "J1",
                    salary: 1,
                    equity: "0.1",
                    companyHandle: "c1",
                    companyName: "C1",
                },
                {
                    id: expect.any(Number),
                    title: "J2",
                    salary: 2,
                    equity: "0.2",
                    companyHandle: "c1",
                    companyName: "C1"
                },
                {
                    id: expect.any(Number),
                    title: "J3",
                    salary: 3,
                    equity: null,
                    companyHandle: "c1",
                    companyName: "C1",
                },
            ],
        });
    });

    test("works: filter", async function () {
        const resp = await request(app).get(`/jobs`).query({ hasEquity: true });
        expect(resp.body).toEqual({
            jobs: [
                {
                    id: expect.any(Number),
                    title: "J1",
                    salary: 1,
                    equity: "0.1",
                    companyHandle: "c1",
                    companyName: "C1",
                },
                {
                    id: expect.any(Number),
                    title: "J2",
                    salary: 2,
                    equity: "0.2",
                    companyHandle: "c1",
                    companyName: "C1"
                },
            ],
        });
    });
});

/************************************** GET /jobs/:id */

describe("GET /jobs/:id", function () {
    test("works for everyone", async function () {
        const resp = await request(app).get(`/jobs/${testJobs[0]}`);
        console.log('Test Jobs:', testJobs);
        expect(resp.body).toEqual({
            job: {
                id: testJobs[0],
                title: "J1",
                salary: 1,
                equity: "0.1",
                company: {
                    handle: "c1",
                    name: "C1",
                    description: "Desc1",
                    numEmployees: 1,
                    logoUrl: "http://c1.img",
                },
            },
        });
    });

    test("job not found", async function () {
        const resp = await request(app).get(`/jobs/0`);
        expect(resp.statusCode).toEqual(404);
    });
});

/************************************** PATCH /jobs/:id */

describe("PATCH /jobs/:id", function () {
    test("patch route for admin", async function () {
        const resp = await request(app).patch(`/jobs/${testJobs[0]}`).send({
            title: "Newnew",
        }).set("authorization", `Bearer ${adminToken}`);
        expect(resp.body).toEqual({
            job: {
                id: expect.any(Number),
                title: "Newnew",
                salary: 1,
                equity: "0.1",
                companyhandle: "c1",
            },
        });
    });

    test("unauth for anon", async function () {
        const resp = await request(app).patch(`/jobs/${testJobs[0]}`).send({
            title: "newJob",
        }).set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("job does not exist", async function () {
        const resp = await request(app).patch(`/jobs/0`).send({
            handle: "test",
        }).set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(400);
    });
});

/************************************** DELETE /jobs/:id */

describe("Delete jobs/:id", function () {
    test("route works for admin", async function () {
        const resp = await request(app).delete(`/jobs/${testJobs[0]}`).set("authorization", `Bearer ${adminToken}`);
        expect(resp.body).toEqual({ deleted: `${testJobs[0]}` });
    });

    test("route does not work for others", async function () {
        const resp = await request(app).delete(`/jobs/${testJobs[0]}`).set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("route does not work for anon", async function () {
        const resp = await request(app).delete(`/jobs/${testJobs[0]}`);
        expect(resp.statusCode).toEqual(401);
    });
});
  