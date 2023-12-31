const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required: true,
        trim: true,
    },
    lastname:{
        type:String,
        required: true,
        trim: true,
    },
    fullname:{
        type: String,
        trim: true
    },
    phone:{
        type:String,
        required: true,
        trim: true,
    },
    email:{
        type:String,
        required: true,
        trim: true,
        lowercase:true
    },
    password:{
        type:String,
        required: true,
        trim: true,
    },
    avatar:String,
    role: String,
    conversations: {
        type: mongoose.Types.ObjectId,
        ref: 'Conversation'
    }
})

const UserModel = mongoose.model('User',UserSchema)

module.exports = UserModel