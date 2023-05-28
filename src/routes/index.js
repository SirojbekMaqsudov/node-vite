const Router = require('express').Router
const router = new Router()

const UserRouter = require('./User')
const AuthRouter = require('./Auth')

const AuthMiddleware = require('../middlewares/AuthMiddleware')
const CheckRoleMiddleware = require('../middlewares/CheckRoleMiddleware')

router.use('/user', AuthMiddleware, CheckRoleMiddleware('ADMIN'), UserRouter)
router.use('/auth', AuthRouter)

module.exports = router