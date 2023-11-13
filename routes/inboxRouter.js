const express = require('express')
const decoratehtmlResponse = require('../middlewares/decorateHtmlResponse')
const { getInbox, addConversation } = require('../controllers/inboxController')
const {checkLogin} = require('../middlewares/checkLogin')
const { serarchUsers } = require('../controllers/searchforaddUser')
const router = express.Router()

router.route('/inbox').get(decoratehtmlResponse('inbox'),checkLogin,getInbox).post()
// search user
router.route('/inbox/search/suggetionsUser').post(serarchUsers)

// add users
router.route('/inbox/conversation').post(checkLogin,addConversation)



module.exports = router