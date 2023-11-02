const jwt = require('jsonwebtoken')

const checkLogin = async (req,res,next)=>{
    let cookies =Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null
    if(cookies){
        try {
            const token = cookies["jwtToken"]
            const decoded = jwt.verify(token,"jwtsecretforexample")
            req.user = decoded
            if (res.locals.html) {
                res.locals.loggedInUser = decoded
            }
            next()
        } catch (error) {
            if (res.locals.html) {
                res.redirect('/login')
            }else{
                res.status(500).json({
                    errors:{
                        common:{
                            msg:"authentication failure!"
                        }
                    }
                })
            }
        }
    }else{
        if(res.locals.html){
            res.redirect('/login')
        }else{
            res.status(401).json({
                error:"authentication failure!"
            })
        }
    }
}

module.exports = {checkLogin}