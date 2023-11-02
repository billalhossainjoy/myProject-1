const UserModel = require("../models/UserModel")
const {unlink} = require('fs')
const path = require('path')

const getUsers = async(req,res)=>{
    try {
        let users = await UserModel.find()
        res.render('users',{users})
    } catch (error) {
        next(err)
    }
}

const removeUser = async (req,res)=>{
    try {
        const user =await UserModel.findByIdAndDelete({
            _id:req.params.id
        })
        if (user.avatar) {
            unlink(path.join(__dirname,`../public/uploads/avatars/${user.avatar}`),(err)=>{
                if (err) {
                    console.log('file can not delete')
                }
            })
        }
        res.status(200).json({
            message:"user was removed successfully"
        })
    } catch (error) {
        res.status(500).json({
            errors:{
                common:{
                    message:'could not delete the user'
                }
            }
        })
    }
}

module.exports = {
    getUsers,
    removeUser
}