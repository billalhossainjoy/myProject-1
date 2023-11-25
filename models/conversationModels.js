const mongoose = require('mongoose')

const converstionsSchema = new mongoose.Schema({
    creatorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    participantId:  {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    last_updated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

const conversationModel = new mongoose.model('Conversation', converstionsSchema)
module.exports = conversationModel
