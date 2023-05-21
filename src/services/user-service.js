const {User} = require("../models/User");
const {ErrorResponse} = require("../exceptions/ErrorResponse");
const bcrypt = require("bcrypt");
const {UserValidate} = require("../validators/User");
const {UserDTO} = require("../dtos/user-dto");
const {TokenService} = require("./token-service");

class UserService {
    async getAll() {
        const users = await User.find().select('-password')
        return users
    }

    async getOne(id) {
        const user = await User.findOne({id}).select('-password')
        if (!user) {
            throw ErrorResponse.NotFound('User not found!')
        }

        return user
    }

    async registration(body) {
        const {email, password, name} = body

        const candidate = await User.findOne({email})
        if (candidate) {
            throw ErrorResponse.BadRequest('User already exist!')
        }

        // Validate user data
        const {error} = UserValidate()(body)
        if (error) throw ErrorResponse.Validation(error.details[0].message)

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({name, email, password: hashPassword})
        const userData = new UserDTO(user)
        const tokens = TokenService.generateTokens(userData)

        return {...tokens, user: userData}
    }

    async login(email, password) {
        const user = await User.findOne({email})
        if (!user) {
            throw ErrorResponse.NotFound('User Not Found!')
        }

        const isPassEqual = await bcrypt.compare(password, user.password)
        if (!isPassEqual) {
            throw ErrorResponse.BadRequest('Wrong Password!')
        }

        const userData = new UserDTO(user)
        const tokens = TokenService.generateTokens(userData)

        return {...tokens, user: userData}
    }

    async remove(id) {
        const user = await User.findOne({id})
        if (!user) {
            throw ErrorResponse.NotFound('User Not Found!')
        }

        const result = await User.deleteOne({id})
        return result
    }
}

module.exports = {
    UserService: new UserService()
}