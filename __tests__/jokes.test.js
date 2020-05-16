const supertest = require("supertest")
const server = require("../index")
const db = require("../database/dbConfig")

afterAll(async () => {
    await db.destroy()
})

describe("Jokes integration tests", () => {

    it("GET /api/jokes", async () => {
        const res = await supertest(server).get("/api/jokes")

        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")

    })


})