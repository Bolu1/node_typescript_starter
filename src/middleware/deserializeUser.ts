import {get} from 'lodash'
const  jwt = require ('jsonwebtoken')
import {Request, Response, NextFunction} from 'express'


const deserializeUser = (req:Request,res:Response,next:NextFunction) =>{
    
    const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "")

    if(!accessToken){
        return next()
    }
    const decoded = jwt.verify(accessToken, 'Balls')
    console.log("decoded ",decoded)
    if(decoded){
        res.locals.user = decoded
        return next()
    }
    next()
}

module.exports = deserializeUser