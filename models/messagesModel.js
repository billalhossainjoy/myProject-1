const mongoose = require('mongoose')

const messageSchema  = mongoose.Schema({
    text: {
        type:String,
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    reciver:  {
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    date_time: {
        type: Date,
        default: Date.now,
      },
    conversation_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
}, {
    timestamps: true
})

module.exports = new mongoose.model("Message",messageSchema)