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
connectMongo(process.env.mongoLink)

// app configaration
app.config = {
    port:8080,
    host:'192.168.0.1'
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

// error handling
app.use(notfoundHandler)
app.use(errorHandler)


app.listen(app.config.port,app.config.host,()=>{
    console.log(`server running on http://${app.config.host}:${app.config.port}`)
})
