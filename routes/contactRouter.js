const express = require('express')
const { getContact } = require('../controllers/contactController')
const decoratehtmlResponse = require('../middlewares/decorateHtmlResponse')
const { checkLogin } = require('../middlewares/checkLogin')
const router = express.Router()

router.route('/contact').get(decoratehtmlResponse("Contact!"),checkLogin,getContact).post()


module.exports = router