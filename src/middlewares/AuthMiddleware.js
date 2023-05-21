const jwt = require('jsonwebtoken')
const {ErrorResponse} = require("../exceptions/ErrorResponse");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return ErrorResponse.Unauthorized()
        }

        const verify = jwt.verify(token)
        req.user = verify

        next()
    }catch (e) {
        return res.json(ErrorResponse.Unauthorized())
    }
}