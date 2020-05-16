/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require("jsonwebtoken")

// function restrict() {
// 	return async (req, res, next) => {
// 		const authError = {
// 			message: "Invalid credentials",
// 		}

// 		try {
// 			console.log(req.headers)
// 			const token = req.cookies.token

// 			if (!token) {
// 				return res.status(401).json(authError)
// 			}

// 			jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
// 				if(err) {
// 					res.status(401).json(authError)
// 				} else {

//           req.token = decodedPayload
//           next()
//         }

// 			})

// 		} catch(err) {
// 			next(err)
// 		}
// 	}
// }

// module.exports = restrict



const restricted = function (req, res, next) {
  return async (req, res, next) => {
		const authError = {
			message: "Invalid credentials",
		}

		try {
      console.log(req.headers)
      
			const token = req.headers.authorization

			if (!token) {
				return res.status(401).json(authError)
			}

			jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
				if(err) {
					res.status(401).json(authError)
				} else {

          req.token = decodedPayload
          next()
        }

			})

		} catch(err) {
			next(err)
		}
	}
  // res.status(401).json({ you: 'shall not pass!' });
};

module.exports = restricted

