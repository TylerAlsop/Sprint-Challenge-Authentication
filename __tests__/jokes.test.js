const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")

afterAll(async () => {
    await db.destroy()
})

describe("Jokes integration tests", () => {

    it("GET auth home endpoint", async () => {
        const res = await supertest(server).get("/api/auth")
        expect(res.statusCode).toBe(200)
        expect(res.body.message).toBe("Auth home endpoint is up and running.")

    })


/////////////  Had to comment this out because the tests only work once before needing to be changed /////////////   

    // it("POST register endpoint. Valid new user.", async () => {
    //     const userCred = { username: "user1", password: "password1" }
    //     const res = await supertest(server)
    //         .post("/api/auth/register")
    //         .send(userCred)

    //     expect(res.statusCode).toBe(201)

    // })

    // it("POST register endpoint. Existing username.", async () => {
    //     const user = await Users.findBy({ username }).first()

    //     const userCred = user
    //     const res = await supertest(server)
    //         .post("/api/auth/register")
    //         .send(userCred)

    //     expect(res.statusCode).toBe(409)

    // })




    // it("GET /api/jokes", async () => {
    //     const res = await supertest(server).get("/api/jokes")

    //     expect(res.statusCode).toBe(200)
    //     expect(res.type).toBe("application/json")
    // })


})