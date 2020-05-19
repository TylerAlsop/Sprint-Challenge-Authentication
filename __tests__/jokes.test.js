require("dotenv").config()
const supertest = require("supertest")
const server = require("../api/server")
const db = require("../database/dbConfig")
const Users = require("../users/usersModel")


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
    //     const newUserCred = { username: "user3", password: "password3" }
    //     const res = await supertest(server)
    //         .post("/api/auth/register")
    //         .send(newUserCred)

    //     expect(res.statusCode).toBe(201)

    // })

    // it("POST register endpoint. Existing username.", async () => {
    //     const user = await Users.findBy({ username }).first()

    //     // const newUserCred = user
    //     const res = await supertest(server)
    //         .post("/api/auth/register")
    //         .send(user)

    //     expect(res.statusCode).toBe(409)

    // })



    it("POST login endpoint", async () => {
        const userCred = { username: "user3", password: "password3" }
        const res = await supertest(server)
            .post("/api/auth/login")
            .send(userCred)

            expect(res.statusCode).toBe(200)

            expect(res.body.username).toBe("user3")

    })

///////////// This is commented out because it requires authorization and we have not be taught how to test with auth. /////////////

    // it("GET /api/jokes", async () => {
    //     const res = await supertest(server).get("/api/jokes")

    //     expect(res.statusCode).toBe(200)
    //     expect(res.type).toBe("application/json")
    // })


})