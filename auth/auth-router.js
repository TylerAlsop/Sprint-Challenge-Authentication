const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("../users/usersModel")
// const restrict = require("../auth/authenticate-middleware")

const router = require('express').Router();


////// This handles the route http://localhost:3300/api/auth

router.post('/register', async (req, res, next) => {
  // implement registration
  try {
		const { username } = req.body
		const user = await Users.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "That username is already taken.",
			})
		}

		res.status(201).json(await Users.add(req.body))
	} catch(err) {
		next(err)
	}
});

router.post('/login', async (req, res, next) => {
  // implement login

  const authError = {
		message: "Invalid Credentials.",
	}

	try {
		const user = await Users.findBy({username: req.body.username }).first()
		if (!user) {
			return res.status(401).json(authError)
		}

		const passwordValid = await bcrypt.compare(req.body.password, user.password)
		if (!passwordValid) {
			return res.status(401).json(authError)
		}

		const tokenPayload = {
			userId: user.id
		}

		res.cookie("token", jwt.sign(tokenPayload, process.env.JWT_SECRET))

		res.json({
			message: `Welcome ${user.username}!`,
			// token: jwt.sign(tokenPayload, process.env.JWT_SECRET),
    })
	} catch(err) {
		next(err)
	}
});

module.exports = router;
