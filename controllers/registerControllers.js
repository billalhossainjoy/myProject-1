const UserModel = require("../models/UserModel");
const bcrypt = require('bcrypt')
const getRegister = async(req,res)=>{
    res.render('register')
}

const addUser = async(req,res)=>{
    let newUser;
    const hashPassword = await bcrypt.hash(req.body.password,10)
    if(req.files && req.files.length > 0){
        newUser = new UserModel({
            ...req.body,
            avatar:req.files[0].filename,
            password:hashPassword
        })
    }else{
        newUser = new UserModel({
            ...req.body,
            password:hashPassword
        })
    }
    try {
        const result = await newUser.save();
        res.status(200).json({
            message:"User was added successfully"
        })
    } catch (error) {
        res.status(500).json({
            errors:{
                common:{
                    msg:"unknown error occured"
                }
            }
        })
    }
}

module.exports = {
    getRegister,
    addUser
}