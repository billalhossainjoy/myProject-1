const express = require('express')
const {getHome} = require('../controllers/homeController')
const decoratehtmlResponse = require('../middlewares/decorateHtmlResponse')
const { logOut } = require('../controllers/loginController')
const { checkLogin } = require('../middlewares/checkLogin')
const router = express.Router()

router.route('/').get(decoratehtmlResponse('Home'),checkLogin,getHome).post()
router.route('/').delete(logOut)

module.exports = router