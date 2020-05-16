const express = require("express")
const Users = require("./usersModel")
const restrict = require("../auth/authenticate-middleware")

const router = express.Router()

// This endpoint is only available to logged-in users due to the `restrict` middleware
router.get("/", restrict(), async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})

module.exports = router