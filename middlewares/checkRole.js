const checkRole = async(req,res,next)=>{
    if(res.locals.loggedInUser.role === 'admin'){
        next ()
    }else{
        res.redirect('/')
    }
}
module.exports = checkRole