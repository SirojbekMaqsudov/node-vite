const {UserService} = require("../services/user-service");
const {User} = require("../models/User");

class UserController {
    async getAll(req, res, next) {
        const users = await UserService.getAll()
        return res.json(users)
    }

    async getOne(req, res, next) {
        try {
            const user = await UserService.getOne(req.params.id)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async registration(req, res, next) {
        try {
            const user = await UserService.registration(req.body)
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body

            const user = await UserService.login(email, password)
            return res.json(user)
        }catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {

    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.body
            const user = await UserService.logout(refreshToken)

            return res.json(user);
        }catch (e) {
            next(e)
        }
    }

    async remove(req, res, next) {
        try {
            const user = await UserService.remove(req.params.id)
            return res.json(user)
        }catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.body
            const user = await UserService.refresh(refreshToken)

            return res.json(user);
        }catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()