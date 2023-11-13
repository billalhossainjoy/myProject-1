const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
const createHttpError = require('http-errors')
const getLogin = async(req,res)=>{
    res.render('login')
}

const login = async(req,res)=>{
    try {
        const user = await UserModel.findOne({$or:[{phone:req.body.username},{email:req.body.username}]})
        if(user && user._id){
            const isValidPass = await bcrypt.compare(req.body.password,user.password)
            if(isValidPass){
                const userObject = {
                    userId:user._id,
                    username:user.firstname+" "+user.lastname,
                    email:user.email,
                    phone:user.phone,
                    role:user.role
                }
                const token = jwt.sign(userObject,"jwtsecretforexample",{
                    expiresIn:86400000
                })
                res.cookie('jwtToken',token,{maxAge:86400000,httpOnly:true,signed:true})
                res.locals.loggedInUser = userObject;
                res.redirect('/inbox')
            }else{
                throw createHttpError('login failed')
            }
        }
    } catch (error) { 
        res.render("login",{
            data:{
                username: req.body.username
            },
            errors:{
                common:{
                    msg:error.message
                }
            }
        })
    }
}

const logOut = async (req,res)=>{
    res.clearCookie("jwtToken")
    res.status(200).json({message:'success'})
}

module.exports = {
    getLogin,
    login,
    logOut
}