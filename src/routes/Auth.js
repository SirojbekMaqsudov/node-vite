const Router = require('express').Router
const router = Router()

const {registration, login, logout, refresh} = require('../controllers/User')

const AuthMiddleware = require('../middlewares/AuthMiddleware')

router.post('/registration', registration)
router.post('/login', login)

router.post('/refresh', refresh)
router.post('/logout', AuthMiddleware, logout)

module.exports = router
