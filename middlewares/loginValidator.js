const { check, validationResult } = require("express-validator");


const loginValidator = [
    check("username")
        .isLength({min:1})
        .withMessage('Mobile number or email is required'),
    check("password")
        .isLength({min:1})
        .withMessage('password are required')
]

const loginValidatorResults = async (req,res,next)=>{
    const errors = validationResult(req)
    const mappedErrors = errors.mapped()
    if(Object.keys(mappedErrors).length === 0){
        next()
    }else{
        res.render("login",{
            data:{
                username:req.body.username
            },
            errors:mappedErrors
        })
    }
}
module.exports = {
    loginValidator,
    loginValidatorResults
}
