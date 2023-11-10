const mongoose = require('mongoose')

const connectMongo = async(mongoLink)=>{
    console.log(mongoLink)
    try {
        await mongoose.connect(mongoLink).then(()=>{console.log('mongodb is connected...')})
    } catch (error) {
        console.log('server error')
        console.log(error)
    }
}

module.exports = connectMongo