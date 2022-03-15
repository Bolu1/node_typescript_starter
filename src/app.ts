const colors = require ('colors')
import express,{Request, Response, NextFunction} from 'express'
const bodyParser = require('body-parser')
const logger = require('./utils/logger')
const v1 = require('./routes/index')
const cors = require('cors')
const sql = require('./utils/connect')
// const DB = require('./utils/crud')
const helmet = require('helmet')
const config = require('config')
const deserializeUser = require ('./middleware/deserializeUser')
// const {startMetricsServer} = require('../src/utils/metrics')
const swaggerDocs  = require('./utils/swagger')
const morgan = require('morgan')

const app = express()


app.use(cors())
app.use(deserializeUser)
app.use(helmet())
app.use(morgan('dev'))

sql.connect((err:any)=>{
    if(err){
        throw err
    }
    console.log("db connected")
})
 

app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(express.json())
// app.use(express.urlencoded({extended: true}))


//main routes
app.use('/v1', v1)
//database routes
// app.use('/db', DB)

// startMetricsServer()
app.use((req:Request,res:Response,next:NextFunction)=>{
    const error = new Error('Not Found')
    res.status(404)
    next(error)
})

app.use((error:any ,req:Request,res:Response,next:NextFunction)=>{
   res.status(error.status || 500)
   res.send(error.message)
})

const PORT = process.env.PORT|| 8080

app.listen(PORT, ()=>{
    
    swaggerDocs(app, PORT)
    logger.info(colors.random(`Application Listening at http://localhost:${PORT}`))
})

module.exports = app