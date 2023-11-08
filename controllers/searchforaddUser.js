const UserModel = require('../models/UserModel')
const serarchUsers = async (req,res)=>{
    const searchparameter = typeof req.params.username == 'string' ? req.params.username : 'a'
    try {
        const users = await UserModel.find({
            $or:[
                {email:searchparameter},
                {firstname:{$regex: searchparameter,$options:'i'}},
                {lastname:{$regex: searchparameter,$options:'i'}},
                {fullname:{$regex: searchparameter,$options:'i'}},
                {phone:{$regex: searchparameter}},
            ]
        })
        const userObject = []
        for (let i = 0; i < users.length; i++) {
            userObject[i] = {
                avatar: users[i].avatar,
                username: users[i].firstname +" "+ users[i].lastname,
                email: users[i].email
            }
        }
        console.log(userObject);
        res.status(201).json(userObject)
    } catch (error) {
        res.status(200).json([])
    }
}

module.exports = {serarchUsers}