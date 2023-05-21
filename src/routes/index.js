const Router = require('express').Router
const router = new Router()

const UserRouter = require('./User')
const AuthRouter = require('./Auth')

router.use('/user', UserRouter)
router.use('/auth', AuthRouter)

module.exports = router