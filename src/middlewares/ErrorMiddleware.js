const {ErrorResponse} = require("../exceptions/ErrorResponse");

module.exports = (err, req, res, next) => {
    if (err instanceof ErrorResponse) {
        return res.status(err.status).json({error: err.message, status: err.status})
    }

    console.log(err)

    return res.status(500).json({message: 'Internal Server Error!'})
}