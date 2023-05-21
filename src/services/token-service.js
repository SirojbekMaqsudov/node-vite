const jwt = require('jsonwebtoken')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign({...payload}, process.env.JWT_ACCESS_SECRET, {expiresIn: process.env.EXPIRES_ACCESS})
        const refreshToken = jwt.sign({...payload}, process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.EXPIRES_REFRESH})

        return {
            accessToken,
            refreshToken
        }
    }


}

module.exports = {
    TokenService: new TokenService()
}