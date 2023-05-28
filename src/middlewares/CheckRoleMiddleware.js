const {ErrorResponse} = require("../exceptions/ErrorResponse");
const jwt = require("jsonwebtoken");

module.exports = (role) =>
    (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.json(ErrorResponse.Unauthorized())
            }

            const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            if (user.role !== role) {
                return res.json(ErrorResponse.Forbidden())
            }

            req.user = user
            next()
        }catch (e) {
            return res.json(ErrorResponse.Unauthorized())
        }

}