const jwt = require('jsonwebtoken')
const {ErrorResponse} = require("../exceptions/ErrorResponse");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json(ErrorResponse.Unauthorized())
        }

        const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        req.user = user

        next()
    }catch (e) {
        return res.status(401).json(ErrorResponse.Unauthorized())
    }
}