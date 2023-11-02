const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')
const express = require('express')
const connectMongo = require('./config/db')
const { notfoundHandler, errorHandler } = require('./middlewares/errorHandler/errorHandler')
const homeRouter = require('./routes/homeRouter')
const loginRouter = require('./routes/loginRouter')
const contactRouter = require('./routes/contactRouter')
const registerRouter = require('./routes/registerRouter')
const usersRouter = require('./routes/usersRoute')
const inboxRouter = require('./routes/inboxRouter')
const uploader = require('./utilities/singleFileUploads')


const app = express()

// connect mongodb
connectMongo('mongodb://127.0.0.1:27017/accounts')

// app configaration
app.config = {
    port: process.env.port || 8080,
    host: process.env.host ||'192.168.0.1'
}

// request parser 
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))

// cookie parser
app.use(cookieParser('cookie Secret'))

// set static folder
app.use(express.static(path.join(__dirname, "public")))

// view engine 
app.set('view engine', 'ejs')

// routing setup
app.use(homeRouter)
app.use(loginRouter)
app.use(registerRouter)
app.use(contactRouter)
app.use(usersRouter)
app.use(inboxRouter)



app.get('/test',async(req,res)=>{
    res.cookie("name","test")
    res.locals.html = true
    res.render('test')
})
app.delete('/test',async(req,res)=>{
    res.clearCookie("name")
    res.json({name:"billal"})
})

// error handling
app.use(notfoundHandler)
app.use(errorHandler)


app.listen(app.config.port,app.config.host,()=>{
    console.log(`server running on http://${app.config.host}:${app.config.port}`)
})
