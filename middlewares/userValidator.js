const { check, validationResult, Result } = require("express-validator");
const UserModel = require("../models/UserModel");
const createHttpError = require("http-errors");
const path = require('path')
const { unlink } = require("fs");

const userValidator = [
    check('firstname')
        .isLength({min:1})
        .withMessage("First name is required")
        .trim(),
    check('lastname')
        .isLength({min:1})
        .withMessage("last name is required")
        .trim(),
    check('phone')
        .isLength({min:1})
        .withMessage("number is required")
        .trim()
        .custom(async(phone)=>{
            try {
                const User = await UserModel.findOne({phone})
                if(User) throw createHttpError('this phone number already exist')
            } catch (error) {
                throw createHttpError(error.message)
            }
        }),
    check('email')
        .isEmail()
            .isEmail()
            .withMessage('invalid email address')
            .trim()
            .custom(async(email)=>{
                try {
                    const User = await UserModel.findOne({email})
                    if(User) throw createHttpError('this email are already exist')
                } catch (error) {
                    throw createHttpError(error.message)
                }
            }),
    check('password')
            .isStrongPassword()
            .withMessage
]

const userValidationResults = (req,res,next)=>{
    const errors = validationResult(req);
    const mappedError = errors.mapped()
    if(Object.keys(mappedError).length === 0) next()
    else{
        if(req.files.length > 0){
            const {filename} = req.files[0]
            setTimeout(() => {
                unlink(path.join(__dirname,`/../public/uploads/avatars/${filename}`),(err)=>{
                    if(err){
                        console.log(err)
                    }
                })
            }, 1000);
        }
        res.status(500).json({
            errors:mappedError
        })
    }
}

module.exports = {
    userValidator,
    userValidationResults
}