const express = require('express')
const { getRegister, addUser } = require('../controllers/registerControllers')
const decoratehtmlResponse = require('../middlewares/decorateHtmlResponse')
const { userValidator, userValidationResults } = require('../middlewares/userValidator')
const avatarUpload = require('../middlewares/avatarUploads')
const router = express.Router()

router.route('/register').get(decoratehtmlResponse('register'),getRegister).post(avatarUpload,userValidator,userValidationResults,addUser)


module.exports = router