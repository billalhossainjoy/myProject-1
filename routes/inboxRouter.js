const express = require('express')
const decoratehtmlResponse = require('../middlewares/decorateHtmlResponse')
const { getInbox, addConversation , inboxmessages, getmessage } = require('../controllers/inboxController')
const {checkLogin} = require('../middlewares/checkLogin')
const { serarchUsers } = require('../controllers/searchforaddUser')
const router = express.Router()

router.route('/inbox').get(decoratehtmlResponse('inbox'),checkLogin,getInbox).post()
// search user
router.route('/inbox/search/suggetionsUser').post(serarchUsers)

// add users
router.route('/inbox/conversation').post(checkLogin,addConversation)
router.route('/inbox/conversation/:cid').get(checkLogin,getmessage)

router.route('/inbox/messages').post(checkLogin,inboxmessages)




module.exports = router