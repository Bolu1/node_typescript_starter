import express, {Request, Response } from 'express'
import { createUserInput } from '../../schema/user.schema'
const bcrypt = require ('bcrypt')
const jwt =  require ('jsonwebtoken')
const db = require('../../utils/connect')


//addUser
exports.addUser = async(req:Request<{}, {}, createUserInput['body']>,res:Response)=>{
    //destructure body
    const {email, password, confirmPassword, firstname, lastname, othernames, phonenumber, gender, dob, department, imageUrl, datejoined} = req.body
    //hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    //payload to the database
    const post = {
        email:email,
        password:hashedPassword,
        firstname:firstname,
        lastname:lastname,
        othernames:othernames,
        phonenumber:phonenumber,
        gender:gender,
        dateofbirth:dob,
        department:department,
        photograph:imageUrl,
        datejoined: datejoined
    }
    try{
        const sqll = `INSERT INTO employee SET ?`
       if(password !== confirmPassword){
        return res.status(400).send('Passwords do not match')
        }
    //add the user
    const results =  db.query(sqll, post, (err:any, result:any)=>{
        if(err) {
            console.log(err)
                return res.status(400).send('something went wrong')
        }
      })
    //send verification mail with signed token
    return res.status(200).send('User added successfully')
    }catch(error){
         console.log(error)
         res.status(500).send("Something went wrong")
    }
}

exports.signin = async(req:Request<{}, {}, createUserInput['body']>,res:Response)=>{
    console.log("res ",res.locals.user)
    const {email, password} = req.body
    var valid:any
    //check if user exists
    const sql = `SELECT * FROM employee WHERE email = '${email}'`
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
         const token = jwt.sign({email:email, id:id, type:type}, 'Balls', {expiresIn: "1h"})
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