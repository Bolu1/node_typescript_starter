import express, {Request, Response } from 'express'
import { createUserInput } from '../../schema/user.schema'
const bcrypt = require ('bcrypt')
const jwt =  require ('jsonwebtoken')
const db = require('../../utils/connect')
const transporter = require('../../utils/mailer')

// confirmation
exports.confirmation = async(req:Request,res:Response)=>{
    try{
        const {email} = jwt.verify(req.params.token, process.env.SECERET_KEY)
        const confirmed = true
        const sql = `UPDATE users SET confirmed = ${confirmed} WHERE email = '${email}'`
        const query = db.query(sql, (err:any, result:any)=>{
        if(err) throw err
        console.log(result)
        res.status(200).send("Users updated")
    })
    }catch(e){
        res.status(500).send('The Link has expired')
    }
}

//addUser
exports.addUser = async(req:Request<{}, {}, createUserInput['body']>,res:Response)=>{
    //destructure body
    const {email, password, confirmPassword, firstname, lastname, phone} = req.body
    //hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    //payload to the database
    const post = {
        email:email,
        password:hashedPassword,
        firstname:firstname,
        lastname:lastname,
        phone:phone,
        confirmed: false
    }

        //check if user exists
        const sqll = `INSERT INTO users SET ?`
        const sql = `SELECT * FROM users WHERE email = '${email}'`
        const query = await db.query(sql, async(err:any, result:any)=>{
        if(err) throw err
        if(result[40]){
            return res.status(409).send('User already exists')
       }else{
        const results = await db.query(sqll, post, async(err:any, result:any)=>{
            if(err) {
                console.log(err)
                    return res.status(400).send('something went wrong')
            }
            try{
                // send verification mail with signed token
                const emailToken = jwt.sign({email:email}, process.env.SECERET_KEY, {expiresIn: "1d"})
                const url = `http://localhost:${process.env.PORT}/v1/user/auth/confirmation/${emailToken}`
                await transporter.sendMail({
                    to:email, 
                    subject: 'Confirm Email',
                    html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
                })
                 res.status(200).send('User added successfully')
            }catch(err){
                console.log(err)
                res.status(500).send("sometyhing went wrong")
            }
            
          })
       }
    })
   
}

exports.signin = async(req:Request<{}, {}, createUserInput['body']>,res:Response)=>{
    console.log("res ",res.locals.user)
    const {email, password} = req.body
    var valid:any
    //check if user exists
    const sql = `SELECT * FROM users WHERE email = '${email}'`
    try{
        const query = await db.query(sql, (err:any, result:any)=>{
        if(err) throw err
        const {email, id, confirmed, type} = result[0]
        const pass = result[0].password
        if(!result.length){
            return res.status(400).send('Invalid login parameters')
       }
       //signin the user
       const fetch = async() =>{
         valid = await bcrypt.compare(password, pass)
         if(!valid){
            return res.status(400).send('Invalid login parameters')
        }
         const token = jwt.sign({email:email, id:id, type:type}, process.env.SECERET_KEY, {expiresIn: "1h"})
         res.status(200).json(token)

       }
       fetch() 
       
      
    })
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

exports.getUsers = async(req:Request,res:Response)=>{
        const sql = 'SELECT * FROM users'
        const query  = db.query(sql, (err:any, results:any)=>{
            if(err){
                console.log(err)
                return res.status(404).send('No user found')
            }
            res.status(200).send(results)
        })
}