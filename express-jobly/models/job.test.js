const db = require("../db");
const Job = require("./job");
const { BadRequestError, NotFoundError } = require("../expressError");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testJobs,
  } = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
    let newJob = {
        companyHandle: "c1",
        title: "Test",
        salary: 120000,
        equity: "0.5",
    };

    test("works", async function () {
        let job = await Job.create(newJob);
        expect(job).toEqual({
        companyHandle: "c1",
        title: "Test",
        salary: 120000,
        equity: "0.5",
        id: expect.any(Number),
        });
    });
});

/************************************** findAll */

describe("findAll", function () {
    test("works: no filter", async function () {
        let jobs = await Job.findAll();
        expect(jobs).toEqual([
            {
                id: testJobs[0],
                title: "Job1",
                salary: 100,
                equity: "0.5",
                companyHandle: "c1",
                companyName: "C1",
            },
            {
                id: testJobs[1],
                title: "Job2",
                salary: 200,
                equity: "0.1",
                companyHandle: "c1",
                companyName: "C1",
            },
            {
                id: testJobs[2],
                title: "Job3",
                salary: 300,
                equity: "0.3",
                companyHandle: "c1",
                companyName: "C1",
            },
        ]);
    });

    test("works: by min salary", async function () {
        let jobs = await Job.findAll({ minSalary: 250 });
        expect(jobs).toEqual([
            {
                id: testJobs[2],
                title: "Job3",
                salary: 300,
                equity: "0.3",
                companyHandle: "c1",
                companyName: "C1",
            },
        ]);
    });

    test("works: by name", async function () {
        let jobs = await Job.findAll({ title: "Job3"});
        expect(jobs).toEqual([
            {
                id: testJobs[2],
                title: "Job3",
                salary: 300,
                equity: "0.3",
                companyHandle: "c1",
                companyName: "C1",
            },
        ]);
    });
});

/************************************** get */

describe("get", function () {
    test("gets by job id", async function () {
        let job = await Job.get(testJobs[0]);
        expect(job).toEqual({
            id: testJobs[0],
            title: "Job1",
            salary: 100,
             equity: "0.5",
            company: {
                handle: "c1",
                name: "C1",
                description: "Desc1",
                numEmployees: 1,
                logoUrl: "http://c1.img",
            },
        });
    });
});

/************************************** update */

describe("update", function () {
    const updateData = {
        title: "New",
        salary: 500,
        equity: "0.5",
    };

    test("updates data", async function () {
        let job = await Job.update(testJobs[0], updateData);
        expect(job).toEqual({
            id: testJobs[0],
            companyhandle: "c1",
            ...updateData,
        });
    });

    test("not found if job does not exit", async function () {
        try {
            await Job.update(0, {
                title: "test",
            });
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** remove */

describe("remove", function () {
    test("removes job", async function () {
        await Job.remove(testJobs[0]);
        const res = await db.query(
            `SELECT id FROM jobs WHERE id=$1`, [testJobs[0]]
        );
        expect(res.rows.length).toEqual(0);
    });
});
