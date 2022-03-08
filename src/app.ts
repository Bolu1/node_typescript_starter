import colors from 'colors'
const express = require ('express')
const bodyParser = require('body-parser')
const logger = require('./utils/logger')
const v1 = require('./routes/index')
const cors = require('cors')
const db = require('./utils/connect')
const DB = require('./utils/crud')
const helmet = require('helmet')
import config = require('config')
const deserializeUser = require ('./middleware/deserializeUser')
// const {startMetricsServer} = require('../src/utils/metrics')
const swaggerDocs  = require('./utils/swagger')

const app = express()


app.use(cors())
app.use(deserializeUser)
app.use(helmet())

db.connect((err:any)=>{
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
app.use('/db', DB)

// startMetricsServer()
const PORT = config.get<number>('port') || 8080

app.listen(PORT, ()=>{
    
    swaggerDocs(app, PORT)
    logger.info(colors.random(`Application Listening at https://localhost:${PORT}`))
})

module.exports = app