const createHttpError = require('http-errors')
const notfoundHandler = (req,res,next)=>{
    next(createHttpError(404,'page not found'))
}

const errorHandler = (err,req,res,next)=>{
    res.locals.title = "Error"
    res.locals.errors = process.env.NODE_ENV === 'development' ? err : {message:err.message}
    res.status(err.status||500)
    if (res.locals.html) {
        res.render('error')
    } else {
        res.json(res.locals.errors)
    }
}

module.exports = {
    notfoundHandler,
    errorHandler
}