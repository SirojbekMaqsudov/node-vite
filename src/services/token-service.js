const jwt = require('jsonwebtoken')
const {ErrorResponse} = require("../exceptions/ErrorResponse");

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign({...payload}, process.env.JWT_ACCESS_SECRET, {expiresIn: process.env.EXPIRES_ACCESS})
        const refreshToken = jwt.sign({...payload}, process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.EXPIRES_REFRESH})

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return user
        }catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return user
        }catch (e) {
            return null;
        }
    }



}

module.exports = {
    TokenService: new TokenService()
}