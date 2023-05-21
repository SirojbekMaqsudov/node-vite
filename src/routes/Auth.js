const Router = require('express').Router
const router = Router()

const {registration, login, logout} = require('../controllers/User')

router.post('/registration', registration)
router.post('/login', login)
router.get('/logout', logout)

module.exports = router
