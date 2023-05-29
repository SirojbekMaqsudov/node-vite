const {ErrorResponse} = require("../exceptions/ErrorResponse");

module.exports = (err, req, res, next) => {

    if (err instanceof ErrorResponse) {
        return res.status(err.status).json(err)
    }

    return res.status(500).json({message: 'Internal Server Error!'})
}