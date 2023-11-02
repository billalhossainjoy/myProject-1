const decoratehtmlResponse = (value)=>{
    return (req,res,next)=>{
        res.locals.html = true;
        res.locals.title = value
        res.locals.loggedInUser = {}
        res.locals.errors = {}
        res.locals.data = {}
        next()
    }
}

module.exports = decoratehtmlResponse