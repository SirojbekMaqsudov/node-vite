const Router = require('express')
const router = Router()

const {getAll, getOne, update, remove} = require('../controllers/User')

router.get('/', getAll)
router.route('/:id').get(getOne).put(update).delete(remove)

module.exports = router