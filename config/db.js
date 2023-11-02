const mongoose = require('mongoose')

const connectMongo = async(mongoLink)=>{
    try {
        await mongoose.connect(mongoLink).then(()=>{console.log('mongodb is connected...')})
    } catch (error) {
        console.log('server error')
    }
}

module.exports = connectMongo