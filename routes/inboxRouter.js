const express = require('express')
const decoratehtmlResponse = require('../middlewares/decorateHtmlResponse')
const { getInbox } = require('../controllers/inboxController')
const {checkLogin} = require('../middlewares/checkLogin')
const router = express.Router()

router.route('/inbox').get(decoratehtmlResponse('inbox'),checkLogin,getInbox).post()

module.exports = router