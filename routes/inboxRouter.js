const express = require('express')
const decoratehtmlResponse = require('../middlewares/decorateHtmlResponse')
const { getInbox } = require('../controllers/inboxController')
const {checkLogin} = require('../middlewares/checkLogin')
const { serarchUsers } = require('../controllers/searchforaddUser')
const router = express.Router()

router.route('/inbox').get(decoratehtmlResponse('inbox'),checkLogin,getInbox).post()
router.route('/inbox/users/:username').get(serarchUsers)

module.exports = router