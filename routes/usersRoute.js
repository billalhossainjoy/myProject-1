const express = require('express')
const { getUsers, removeUser } = require('../controllers/usersController')
const decoratehtmlResponse = require('../middlewares/decorateHtmlResponse')
const { checkLogin } = require('../middlewares/checkLogin')
const checkRole = require('../middlewares/checkRole')
const router = express.Router()

router.route('/users').get(decoratehtmlResponse("users!"),checkLogin,checkRole,getUsers).post()
router.route('/users/:id').delete(removeUser)

module.exports = router