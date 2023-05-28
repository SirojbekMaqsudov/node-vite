const jwt = require('jsonwebtoken')
const {ErrorResponse} = require("../exceptions/ErrorResponse");
const {Token} = require("../models/Token");

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


    async findToken(refreshToken) {
        const token = await Token.findOne({refreshToken})
        return token
    }

    async removeToken(refreshToken) {
        const token = await Token.deleteOne({refreshToken})
        return token
    }

    async saveToken(userID, refreshToken) {
        const tokenData = await Token.findOne({userID})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        const token = await Token.create({userID, refreshToken})
        return token
    }
}

module.exports = {
    TokenService: new TokenService()
}