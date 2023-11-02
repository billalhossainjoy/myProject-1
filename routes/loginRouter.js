const express = require('express')
const { getLogin, login, logOut } = require('../controllers/loginController')
const decoratehtmlResponse = require('../middlewares/decorateHtmlResponse')
const { loginValidator, loginValidatorResults } = require('../middlewares/loginValidator')
const { checkLogin } = require('../middlewares/checkLogin')
const router = express.Router()

router.route('/login').get(decoratehtmlResponse('Login'),getLogin).post(decoratehtmlResponse('Login'),loginValidator,loginValidatorResults,login)


module.exports = router 