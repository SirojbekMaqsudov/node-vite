class ErrorResponse extends Error {
    constructor(message, status) {
        super(message);
        this.error = message
        this.status = status
    }

    static BadRequest(message) {
        return new ErrorResponse(message, 400)
    }

    static NotFound(message = 'Not Found!') {
        return new ErrorResponse(message, 404)
    }

    static Unauthorized() {
        return new ErrorResponse('Unauthorized', 401)
    }

    static Validation(message = 'Validation Error!') {
        return new ErrorResponse(message, 400)
    }

    static Forbidden(message = 'Forbidden') {
        return new ErrorResponse(message, 403)
    }
}

module.exports = {
    ErrorResponse
}